import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.schema';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(admin: Admin): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return createdAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return admin;
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<AdminDocument> {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, admin: Admin): Promise<Admin> {
    if (admin.password) admin.password = await bcrypt.hash(admin.password, 10);
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(id, admin, { new: true })
      .exec();
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return updatedAdmin;
  }

  async delete(id: string): Promise<any> {
    const deletedAdmin = await this.adminModel.findByIdAndDelete(id).exec();
    if (!deletedAdmin) {
      throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return { message: 'Admin deleted successfully' };
  }

  async seed(count: number): Promise<string> {
    const admins = [];
    for (let i = 0; i < count; i++) {
      admins.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
      });
    }

    await this.adminModel.insertMany(admins);
    return `Generate ${count} admin successfully`;
  }

  async reset(): Promise<string> {
    try {
      await this.adminModel.deleteMany({ email: { $ne: 'admin@mail.com' } });
      return 'Reset admins successfully';
    } catch (error) {
      console.error('Error resetting the admin : ', error);
      throw new Error('Failed to reset the database.');
    }
  }
}
