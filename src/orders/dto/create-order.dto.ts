import { ObjectId } from "bson";
import * as mongoose from "mongoose";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateOrderDto {

    readonly id?: ObjectId;

    @ApiModelProperty({type: Array.of(Object), example: "[{quantity: 1, product: 5d33fdafc8c7a56d62cd6ac0}]"})
    readonly items: [{quantity: Number, product: mongoose.Schema.Types.ObjectId}];

    @ApiModelProperty({type: ObjectId, example: "5d33fc0ac8c7a56d62cd6ac9", required: true})
    readonly user: mongoose.Schema.Types.ObjectId;
}
