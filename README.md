# Supplycart UI

### Getting Started
1. Run `pnpm install`
2. Run `pnpm link`
3. Run `pnpm install-demo`
4. Run `pnpm serve` to run demo app

If you want to use this repo as the `@supplycart/ui` packages for ADAM/HUB/EVA repo locally, run `pnpm link "@supplycart/ui"` at the root directory of the repo.

#### Money
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | int, string | | Money value in decimal or integer |
| convertPrecision | int | | convert precision of Dinero object |

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


#### TextareaInput
| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | String |  | Input value |
| label | String |  | Form label |

#### DropdownInput
This component is based on [vue-select](https://vue-select.org/) . Can refer to this documentation

| Props | Type | Default | Description |
| --- | --- | --- | --- |
| value | String |  | Input value |
| form-label | String |  | Form label |

