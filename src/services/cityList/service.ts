import { securityApi } from '../../api/securityApi';

interface City {
  _id: string;
  full_cityname: string;
  cityname: string;
}

interface Country {
  _id: string;
  countryname: string;
  alpha2: string;
  countryphonecode: string;
  phone_number_min_length: number;
  phone_number_length: number;
  city_list: City[];
}

interface CountryCityResponse {
  success: boolean;
  country_list: Country[];
}

export const getCountryCityList = async (): Promise<CountryCityResponse | null> => {
  try {
    const response = await securityApi.get('/citytype/get_country_city_list');
    return response.data;
  } catch (error) {
    console.error('Error fetching country city list:', error);
    return null;
  }
};