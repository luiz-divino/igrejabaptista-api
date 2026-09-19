export interface IUseCase<Input = void, Output = void> {
  execute(request?: Input): Promise<Output>;
}
