# Supplycart UI

### Getting Started
1. Run `yarn install`
2. Run `yarn link`
3. Run `yarn install-demo`
4. Run `yarn serve` to run demo app

#### Money
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | | Money value in decimal or integer |

#### MoneyInput
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | | Money value in decimal or integer |

#### DatePicker
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | | Money value in decimal or integer |

#### DateRangePicker
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | | Money value in decimal or integer |

#### DateTime
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | Date, string | | Datetime value in date or string |
| timezone | string | Asia/Kuala_Lumpur | Timezone value in string |
| format | string | YYYY-MM-DD HH:mm:ss | Format value in string |
| isUtc | Boolean | true | display date in UTC format with specified timezone |

#### PhoneInput
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | null | Input value |

#### Address
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | Object | | value of the address |
| type | string | | type of the address |
| country | string | Malaysia | country of the address |
| display | array | | specific field to display|

#### AddressForm
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | Object | | value of the address |
| type | string | | type of the address 'billing' or 'delivery' |
| country | string | Malaysia | country of the address |
| countries | Array | Malaysia | array of countries for dropdown list |
| disableFields | Array |  | array fields to be disabled. Available value: 'unit' 'floor' 'building' 'street' 'city' 'postcode' 'state' 'country' or 'all' to disable all |

#### PasswordInput
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | null | Input value |

#### ButtonAttachment
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | Array | [] | Input value |
| label | String |  | Button label |
| icon | String |  | Button Icon |
| mode | String | multiple | Only 'single' or 'multiple' accepted |
| maxSize | Number | 20000000 | Maximum size of file to be upload |
| format | Array | [] | List of allowed format. (csv, pdf, etc)  |

| Event | Description |
| --- | --- |
| deleted | return deleted data contains index and deleted file |

#### AttachmentInput
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | Array | [] | Input value |
| label | String |  | Button label |
| mode | String | multiple | Only 'single' or 'multiple' accepted |
| maxSize | Number | 20000000 | Maximum size of file to be upload |
| format | Array | [] | List of allowed format. (csv, pdf, etc)  |

| Event | Description |
| --- | --- |
| deleted | return deleted data contains index and deleted file |