import * as mongoose from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    readonly id?: mongoose.Schema.Types.ObjectId;

    @ApiModelProperty({type: Array.of(Object), example: '[{quantity: 1, product: 5d33fdafc8c7a56d62cd6ac0}]'})
    readonly items: [{quantity: number, subtotal: number, product: mongoose.Schema.Types.ObjectId}];

    @ApiModelProperty({type: mongoose.Schema.Types.ObjectId, example: '5d33fc0ac8c7a56d62cd6ac9', required: true})
    readonly user: mongoose.Schema.Types.ObjectId;
}
