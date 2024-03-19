interface Error {
  status?: number;
  isJoi?: boolean
}

declare namespace Express {
  export interface Request {
    payload: {
      userId: string;
    };
  }
}


interface User {
  email: string,
  password: string,
  isAdmin: boolean,
  isValidPassword(password: string): Promise<boolean>
}

type UserModel = mongoose.Model<User>

// interface Product {
//   product_name: string;
//   product_thumb: string;
//   product_description: string;
//   product_price: number;
//   product_quantity: number;
//   product_shop: string;
//   product_attributes: string[];
//   product_id?: ObjectId;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

