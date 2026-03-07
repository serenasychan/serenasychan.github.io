export interface CoursePreReq {
  course: string;
  preReq: string;
}

export interface CourseGraph {
  inDegree: Map<string, number>;
  adjacencyList: Map<string, string[]>;
}
