import { ObjectId } from 'bson';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    readonly id?: ObjectId;

    @ApiModelProperty({type: Array.of(Object), example: '[{quantity: 1, product: 5d33fdafc8c7a56d62cd6ac0}]'})
    readonly items: [{quantity: number, subtotal: number, product: {id: ObjectId, price: number}}];

    @ApiModelProperty({type: ObjectId, example: '5d33fc0ac8c7a56d62cd6ac9', required: true})
    readonly user: ObjectId;
}
