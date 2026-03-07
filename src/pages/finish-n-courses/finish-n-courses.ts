import { Component, signal } from '@angular/core';
import { CourseGraph, CoursePreReq } from './interfaces';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule } from '@angular/forms';
import { exampleCoursePreReqs, exampleCourses } from './inputs';
import mermaid from 'mermaid';

@Component({
  selector: 'app-finish-n-courses',
  imports: [
    CardComponent,
    FormsModule
  ],
  templateUrl: './finish-n-courses.html',
  styleUrl: './finish-n-courses.scss',
})
export class FinishNCourses {
  initialView = true;
  coursesInput = signal(exampleCourses);
  coursePreReqsInput = signal(exampleCoursePreReqs);
  canFinishAllCourses = signal(false);
  orderOfCourses: string[][] = [];

  runCheck(): void {
    this.canFinishAllCourses.set(false);
    const courses = this.cleanCourses(this.coursesInput());
    const coursePreReqs = this.cleanPreReqs(this.coursePreReqsInput());

    const result = this.checkIfCanFinishAllCourses(courses, coursePreReqs);
    this.initialView = false;
    this.renderGraph(coursePreReqs);
    this.canFinishAllCourses.set(result);
  }

  private cleanCourses(rawCourses: string): string[] {
    return rawCourses
      .split('\n')
      .map(course => course.trim())
      .filter(course => course.length > 0);
  }

  private cleanPreReqs(rawPreReqs: string): CoursePreReq[] {
    return rawPreReqs
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('(') && line.endsWith(')'))
      .map(line => {
        // Remove '(' and ')', then split by ','
        const [preReq, course] = line
          .replace(/[()]/g, '')
          .split(',')
          .map(item => item.trim());
        return { course, preReq };
      })
  }

  checkIfCanFinishAllCourses(courses: string[], coursePreReqs:  CoursePreReq[]): boolean {
    // 1. Set up local maps
    this.orderOfCourses = [];
    const { inDegree, adjacencyList } = this.buildGraph(courses, coursePreReqs);

    const queue: string[] = [];
    let processedCount = 0;

    // 2. Initialize queue (Courses with no prerequisites)
    inDegree.forEach((count, course) => {
      if (count === 0) {
        queue.push(course);
      }
    })

    // 3. Kahn's Algorithm (Batch/Term Mode)
    while (queue.length > 0) {
      const levelSize = queue.length; // 1. Capture how many are ready NOW
      const currentLevel: string[] = [];

      for (let i = 0; i < levelSize; i++) {
        const course = queue.shift()!; // 2. Only process what was ready at start of loop
        processedCount++;
        currentLevel.push(course);

        const neighbours = adjacencyList.get(course) || [];
        neighbours.forEach((neighbour) => {
          const remaining = inDegree.get(neighbour)! - 1;
          inDegree.set(neighbour, remaining);

          if (remaining === 0) {
            queue.push(neighbour); // 3. These go to the NEXT batch
          }
        });
      }

      // 4. Now we have a complete "Term"
      this.orderOfCourses.push(currentLevel);
    }

    // If we processed all courses, there are no cycles
    return processedCount === inDegree.size;
  }

  private buildGraph(courses: string[], coursePreReqs: CoursePreReq[]): CourseGraph {
    const inDegree = new Map<string, number>();
    const adjacencyList = new Map<string, string[]>();
    const courseGraph = { inDegree, adjacencyList };
    // Initialize Structures
    courses.forEach(course => this.addCourseToMaps(course, courseGraph));

    // Build the graph
    coursePreReqs.forEach(({ course,  preReq }: CoursePreReq) => {
      // Add preReqs missing from the original 'courses' list
      if (inDegree.has(course) && inDegree.has(preReq)) {
        const courseInDegree = (inDegree.get(course) || 0) + 1;
        inDegree.set(course, courseInDegree);

        adjacencyList.get(preReq)!.push(course);
      } else if (inDegree.has(course)) {
        // Course is in our list but prerequisite isn't so we have an "impossible" requirement.
        // Manually set the inDegree of th course so it can never be cleared
        inDegree.set(course, Infinity);
      }
      // If 'course' isn't in our list, we don't care about its prereqs
    });

    return { inDegree, adjacencyList };
  }

  private addCourseToMaps(course: string, { inDegree, adjacencyList }: CourseGraph): void {
    if (!inDegree.has(course)) {
      inDegree.set(course, 0);
    }
    if (!adjacencyList.has(course)) {
      adjacencyList.set(course, []);
    }
  }

  private async renderGraph(preReqs: CoursePreReq[]): Promise<void> {
    const container = document.getElementById('graph-container');
    if (!container) return;

    // 1. Build the Mermaid string
    let graphDefinition = 'graph LR\n';

    this.orderOfCourses.forEach((coursesInRank, index) => {
      graphDefinition += `%% Group Level ${index + 1}\n`;
      graphDefinition += `  subgraph Term ${index + 1}\n`;
      graphDefinition += `  ${coursesInRank.join('\n  ')}\n`;
      graphDefinition += `end\n`;

    })
    preReqs.forEach(({ course, preReq }) => {
      graphDefinition += `  ${preReq} --> ${course}\n`;
    });

    // 2. Initialize and render
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
    const { svg } = await mermaid.render('graph-svg', graphDefinition);
    container.innerHTML = svg;
  }
}
