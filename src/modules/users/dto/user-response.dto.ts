export interface AddressResponseDto {
    country: string;
    state: string;
}

export interface UserDetailsResponseDto {
    uuid: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    profileImg: string | null;
    addresses: AddressResponseDto | null;
}
