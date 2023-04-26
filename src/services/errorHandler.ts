export class ErrorHandler {
  private store: CourseStore;

  constructor(store: CourseStore) {
    this.store = store;
  }

  handleError(error: unknown) {
    const typedError = error as Error;
    this.store.error = true;
    this.store.errorMessage = typedError.message;
  }
}