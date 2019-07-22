import * as uuidv1 from 'uuid/v1';

export function generateOrderNumber(): string{
    const on = uuidv1();
    console.log(on);
    return on;
}
