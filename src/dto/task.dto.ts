import { IsNotEmpty, Length } from "class-validator"

export class TaskDto {
    @IsNotEmpty({ message: 'the task should have a title' })
    title: string

    @IsNotEmpty()
    @Length(3, 255)
    body: string

    createdAt: Date

}