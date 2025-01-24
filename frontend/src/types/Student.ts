
export interface Student{
  name: string;
  email:string;
  cpf: string;
  ra: string;
  id?:string;
  created_at?:string;
  updated_at?:string;
}

export interface StudentStore{
  students: Student[];
  student: Student;
  loading: boolean,
  error: unknown,
}