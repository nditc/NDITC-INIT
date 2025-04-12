declare module "*.json" {
  const value: {
    developers: Array<{
      name: string;
      role: string;
      image: string;
      facebook?: string;
    }>;
  };
  export default value;
}

export interface Developer {
  name: string;
  post: string;
  image: string;
  facebook?: string;
  role: string;
}
