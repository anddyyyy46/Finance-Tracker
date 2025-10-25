export interface UserReadDto{
    id: string;
    email: string;
    fullname: string;
    username: string;
}
export interface ReadTransactionDto {
    id: string;
    user: UserReadDto;
    amount: number;
    categoryId: number;
    date: Date;
    transactionMedium: string;
    paymentPartnerId: number;
    importance: string;
}
export interface CreateTransactionDto {
    amount: number;
    date?: Date | null;
    paymentParnterId?: number;
    transactionMedium?: string;
    categoryId?: number;
    importance?: string;

}