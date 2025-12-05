export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    isActive: 'boolean'
  },
  category: {
    id: 'number',
    name: 'string'
  },
  brand: {
    id: 'number',
    name: 'string',
    logo: 'string'
  },
  fuelType: {
    id: 'number',
    type: 'string'
  },
  car: {
    id: 'number',
    model: 'string',
    year: 'number',
    price: 'string',
    brandId: 'number',
    categoryId: 'number',
    fuelTypeId: 'number'
  }
};