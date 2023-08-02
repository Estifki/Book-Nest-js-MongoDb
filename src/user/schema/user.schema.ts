import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/utils/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  password: string;

  @Prop({ default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
