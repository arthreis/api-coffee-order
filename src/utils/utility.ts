import * as uuidv1 from 'uuid/v1';

export function generateOrderNumber(): string {
    return uuidv1();
}
