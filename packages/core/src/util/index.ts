export function FunctionTimer(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (...args: unknown[]) {
    const start = performance.now();
    const result: unknown = originalMethod.apply(this, args);
    const end = performance.now();
    const time = end - start;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Call: ${target.constructor.name}.${propertyKey}(${args}) => ${result} in ${time}ms`);
    return result;
  };

  return descriptor;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
