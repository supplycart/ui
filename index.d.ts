import type { Component } from "vue";

export interface CurrencyDefinition {
    code: string;
    country: string;
    format: string;
    formatWithSign: string;
    locale: string;
    precision: number;
    symbol?: string;
}

export interface TimezoneDefinition {
    label: string;
    value: string;
}

export const Address: Component;
export const AddressForm: Component;
export const AttachmentInput: Component;
export const BaseAttachment: Component;
export const BaseInput: Component;
export const Checkbox: Component;
export const Currency: Component;
export const DatePicker: Component;
export const DateRangePicker: Component;
export const DateTime: Component;
export const DecimalField: Component;
export const DropdownInput: Component;
export const EmailInput: Component;
export const FormLabel: Component;
export const Money: Component;
export const MoneyInput: Component;
export const MoneyInputV2: Component;
export const MoneyV2: Component;
export const Paginate: Component;
export const PasswordInput: Component;
export const PerPageSelect: Component;
export const PhoneInput: Component;
export const QuantityInput: Component;
export const RemarksInput: Component;
export const SubmitButton: Component;
export const TextareaInput: Component;
export const TextField: Component;
export const TextInput: Component;
export const TimePicker: Component;

export const Currencies: CurrencyDefinition[];
export const DefaultCurrency: CurrencyDefinition;
export const CurrencySettings: Record<string, unknown>;
export const DefaultDisplayFormat: string;
export const Timezones: TimezoneDefinition[];
export interface AddressRequirements {
	unit: boolean;
	floor: boolean;
	building: boolean;
	street: boolean;
	city: boolean;
	district: boolean;
	postcode: boolean;
	zipcode: boolean;
	state: boolean;
	province: boolean;
}
export const addressConfig: Record<string, AddressRequirements>;

export function currency(countryCurrency: string | CurrencyDefinition, type: keyof CurrencyDefinition): CurrencyDefinition[keyof CurrencyDefinition];
export function displayDate(value: string | number | Date | null | undefined, format?: string, timezone?: string, isUtc?: boolean): string;
export function format(amount: number, currency: string | CurrencyDefinition, sign?: boolean): string;
export function formatCents(amount: number, currency: string | CurrencyDefinition, sign?: boolean, intValue?: boolean, decimal?: number): string;
export function isFloat(value: number): boolean;
export function isInt(value: number): boolean;
export function validateAttachmentFormat(file: File, formats: string[]): boolean;
export function validateAttachmentSize(file: File, maxSizeMegabytes: number): boolean;
