export interface Product {
  _id: string;
  images: string[];
  slug: string;
  name: string;
  buyingPrice: string;
  sellingPrice: string;
  subcategory: string;
  offer?: string;
}

export interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface UserType {
  name?: string;
  phone?: string;
  email?: string;
  avatarUrl?: string;
}

export interface MenuItem {
  link: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface SocialLink {
  icon: React.ComponentType<any>;
  url: string;
}

export interface AddressFormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  streetAddress: string;
}

export interface OrderItem {
  orderId: string;
  createdAt: string;
  items: { length: number };
  orderStatus: string;
  paymentType: string;
  total: number;
  _id: string;
  orderTime?: string;
  orderType?: string;
  shippingAddress?: string;
  billingAddress?: string;
  customerName?: string;
  shippingMethod?: string;
  paymentStatus?: string;
}
