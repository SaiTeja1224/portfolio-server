export default class ExpressError extends Error {
  constructor(public message: string, public status: number) {
    super();
  }
}
