<template>
    <div id="app"
         class="flex-1">
        <div class="text-center my-8">
            <img alt="Vue logo"
                 src="./assets/logo.png"
                 class="mx-auto w-24 mb-3">
            <h1 class="text-xl font-bold">Supplycart UI</h1>
        </div>
        <div class="grid grid-cols-2 gap-3">
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">DatePicker</h2>
                <DatePicker class="p-2 rounded border border-gray-200 w-1/2"
                    :disabled="false"
                            placeholder="Select Date"/>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">DateRangePicker</h2>
                <DateRangePicker
                    v-model="dateRange"
                    :config="{minDate}"
                    timezone="Asia/Kuala_Lumpur"
                    class="mb-4 p-2 rounded border border-gray-200 w-1/2"
                    placeholder="Select Date"/>
                <br>
                <DateRangePicker
                    v-model="dateRange"
                    :disabled="true"
                    :config="{minDate}"
                    timezone="Asia/Kuala_Lumpur"
                    class="mb-4 p-2 rounded border border-gray-200 w-1/2"
                    placeholder="Select Date"/>
                <pre>{{ dateRange }}</pre>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">TimePicker</h2>
                <TimePicker
                    v-model="time"
                    class="mb-4 p-2 rounded border border-gray-200 w-1/2"
                    placeholder="Select Time"/>
                <br>
                <pre>{value: {{ time }}}</pre>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Money</h2>
                <Money :sign="true"
                       currency="MYR"
                       :value="money.integer"
                       :decimal="money.decimal"
                       :convert-precision="3"
                       class="block mb-4 p-2 w-1/2"/>

                <pre>{value: {{ money.integer }} }</pre>

                <br>

                <Money :sign="true"
                       currency="MYR"
                       :value="money.value"
                       :decimal="money.decimal"
                       :int-value="false"
                       class="block mb-4 p-2 w-1/2"/>

                <pre>{value: {{ money.value }} }</pre>
                
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Money v2</h2>
                <MoneyV2 :value="1238338" :decimal="4" :with-sign="true" currency="SGD" :convert-precision="2"  />
                <Currency currency='JPY' type="code"/>
            </div>
            <div class="p-12">
                <MoneyInputV2 v-model="moneyv2" currency="MYR" :decimal="2" label="Unit Price" :disabled="true" :required="true" :withSign="true" format="0,0.00" :allow-negative="false"/>
                <h2 class="mb-2 font-bold text-gray-600">MoneyInput</h2>
                <MoneyInput v-model="testMoneyVal"
                :sign="true"
                            currency="JPY"
                            class="mb-4 p-2 rounded border border-gray-200 w-1/2"/>

                <pre>{value: <Money :sign="true"
                       currency="JPY"
                       :value="testMoneyVal"/> }</pre>

                <br>

                <MoneyInput v-model="moneyInput.value"
                            :int-value="false"
                            currency="MYR"
                            :decimal="moneyInput.decimal"
                            class="mb-4 p-2 rounded border border-gray-200 w-1/2"/>

                <pre>{value: {{ moneyInput.value }} }</pre>
            </div>

            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Display Address</h2>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Billing Address</h3>
                    <Address
                        v-model="malaysiaBillingAddress"
                        country="Singapore"
                        type="billing"/>
                </div>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Delivery Address</h3>
                    <Address
                        v-model="malaysiaDeliveryAddress"
                        country="Malaysia"
                        type="delivery"/>
                </div>
            </div>
           
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Address Form</h2>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Billing Address</h3>
                    <AddressForm
                        v-model="malaysiaBillingAddress"
                        country="Malaysia"
                        :countries="['Malaysia', 'Indonesia', 'Hong Kong', 'Cambodia', 'Philippines', 'Singapore']"
                        type="billing"/>
                </div>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Delivery Address</h3>
                    <AddressForm
                        v-model="malaysiaDeliveryAddress"
                        :country="deliveryCountry"
                        :countries="['Malaysia', 'Indonesia', 'Hong Kong', 'Cambodia']"
                        :disableFields="[]"
                        type="delivery"/>
                </div>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">General Address</h3>
                    <AddressForm
                        v-model="malaysiaDeliveryAddress"
                        :country="deliveryCountry"
                        :countries="['Malaysia', 'Indonesia', 'Hong Kong', 'Cambodia']"
                        :disableFields="['country', 'state']"
                        type="general"/>
                </div>
            </div>
           
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Datetime</h2>
                <div class="mb-4">
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'dd MMM yy'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'dd MMM yyyy'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'dd MMM yyyy hh:mma'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'EEE, dd MMM yyyy HH:mm'"/>
                    <DateTime
                        :value="currentTime"
                        :is-utc="true"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'EEE, dd MMM yyyy HH:mm'"/>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Attachment</h2>
                <div class="mb-4">
                   
                    <AttachmentInput
                        v-model="attachments"
                        :maxSize="10"
                        @onError="displayError"
                        :format="[
                        'pdf',
                        'csv',
                        'xlsx'
                        ]"
                        class="p-2 rounded border border-gray-200 w-1/2 mb-4"
                        />
                    <pre>{Attachment Count: {{ attachments.length }} }</pre>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Input</h2>
                <div class="mb-4">
                    <TextInput
                        label="First Name"
                        v-model="name.first"
                        :required="true"
                        class="w-1/2 mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <TextInput
                        label="Last Name"
                        v-model="name.last"
                        :required="true"
                        class="w-1/2 mr-4 mb-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <QuantityInput
                        label="Quantity"
                        v-model="quantity"
                        :required="true"
                        :minimum-value="5"
                        :maximum-value="100"
                        :min-decimal="2"
                        :max-decimal="4"
                        :allow-negative="true"
                        class="w-1/2 mr-4 mb-4"
                        input-class="w-full mt-2 p-2 rounded border border-gray-200"
                    />
                    <PhoneInput
                        label='Phone'
                        class="w-1/2 mr-4 mb-4"
                        input-class="w-full mt-2 p-2 rounded border border-gray-200"
                        v-model="phone"
                        :required="true"
                    />
                    <RemarksInput
                        label='Remarks'
                        class="w-1/2 mr-4 mb-4"
                        input-class="p-2 w-full rounded border border-gray-200"
                        v-model="phone"
                        :required="true"
                    />
                    <EmailInput
                        label='Email'
                        class="w-1/2 mr-4 mb-4"
                        input-class="p-2 w-full rounded border border-gray-200"
                        v-model="email"
                        :required="true"
                    />
                    <Checkbox
                        label="Checkbox"
                        v-model="check"
                        input-class="mr-2 form-checkbox h-4 w-4"
                    />
                    <PasswordInput
                        label="Password"
                        class="w-1/2 mr-4 mb-4"
                        v-model="password"
                        input-class="p-2 w-full rounded border border-gray-200"
                        format="The password should more than 8 characters."
                        :required="true"
                    />
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Button</h2>
                <div>
                    <SubmitButton
                        class="p-2 rounded bg-blue-300 cursor-pointer mb-4"
                        :loading="true"/>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Pagination</h2>
                <div>
                    <Paginate v-bind="meta" btn-class="py-2 px-3 border"/>
                </div>
            </div>
            <div class="p-12">
                <TextareaInput
                        label='Text area'
                        class="w-1/2 mr-4 mb-4"
                        input-class="p-2 w-full rounded border border-gray-200"
                        value="phone"
                        :required="true"
                        error="hello"
                    />

                <DropdownInput
                    v-model="state"
                    multiple
                    :required="true"
                    :options="stateOptions"
                    :reduce="state => state.id"
                    label="label"
                    @input="test"
                    :filterable="false"
                    form-label="Dropdown Input" 
                    :error="dropdownError" />

                <TextInput
                    label="Error"
                    v-model="dropdownError"
                    class="w-1/2 mr-4 mb-4"
                    input-class="p-2 rounded border border-gray-200"
                />
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Display Decimal</h2>
                <div class="mb-4">
                    <DecimalField label="Quantity" :minDecimal="1" :maxDecimal="2" value="3500.567"/>
                </div>
                
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">formatCents Function</h2>
                <div class="mb-4">
                    {{formatCents(234564560, "MYR", false, true, 4)}}
                </div>
                
            </div>
            <div class="p-12">
                
            </div>
        </div>
    </div>
</template>

<script>
    import {
        Address,
        AddressForm,
        AttachmentInput,
        Checkbox,
        DatePicker,
        DateRangePicker,
        DateTime,
        TimePicker,
        Money,
        MoneyV2,
        MoneyInput,
        MoneyInputV2,
        EmailInput,
        TextInput,
        PhoneInput,
        RemarksInput,
        SubmitButton,
        QuantityInput,
        Paginate,
        PasswordInput,
        TextareaInput,
        DropdownInput,
        DecimalField,
        formatCents,
        Currency
    } from "@supplycart/ui";
    import { format } from "date-fns";
    import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

    export default {
        name: "App",
        components: {
            Address,
            AddressForm,
            AttachmentInput,
            Checkbox,
            DateTime,
            DatePicker,
            TimePicker,
            DateRangePicker,
            Money,
            MoneyV2,
            MoneyInput,
            MoneyInputV2,
            EmailInput,
            TextInput,
            PhoneInput,
            RemarksInput,
            SubmitButton,
            QuantityInput,
            Paginate,
            PasswordInput,
            TextareaInput,
            DropdownInput,
            DecimalField,
            Currency,
        },
        data() {
            return {
                moneyv2: 0,
                deliveryCountry: "Malaysia",
                attachments: [],
                minDate: format(zonedTimeToUtc(new Date(), "Asia/Kuala_Lumpur"), "yyyy-MM-dd"),
                dateRange: {
                    from: "2020-03-19",
                    to: "2020-03-24"
                },
                moneyInput: {
                    integer: 1000,
                    value: 10.00,
                    decimal: 4,
                },
                testMoneyVal: 0,
                money: {
                    integer: 102355,
                    value: 10.00,
                    decimal: 4,
                },
                malaysiaBillingAddress: {
                    entity_name: "Supplycart",
                    pic_name: "Will",
                    pic_phone: "012340545343",
                    unit: "PG02",
                    floor: "Ground Floor",
                    building: "Phoenix Tower",
                    street: "Jalan BM1/8 Taman Bukit Mayang Emas",
                    city: "Petaling Jaya",
                    state: "Selangor",
                    postcode: "47301",
                    country: "Singapore",
                    einvoice_email: "will@supplycart.my",
                    registration_no: "REG0001",
                    ref_no: "REG0011A"
                },
                malaysiaDeliveryAddress: {
                    branch_name: "Supplycart",
                    unit: "PG02",
                    floor: "Ground Floor",
                    building: "Phoenix Tower",
                    street: "Jalan BM1/8 Taman Bukit Mayang Emas",
                    city: "Petaling Jaya",
                    state: "Selangor",
                    postcode: "47301",
                    country: "Malaysia",
                    pic_phone: "012340545343",
                    lift_access: true,
                    requires_permit: false
                },
                name: {
                    first: null,
                    last: null
                },
                quantity: 200,
                phone: "019-1234566",
                time: null,
                check: false,
                password: "",
                currentTime: format(utcToZonedTime(new Date(), "Asia/Kuala_Lumpur"), "yyyy-MM-dd HH:mm:ss"),
                meta: {
                    total: 180,
                    last_page: 10,
                    from: 1,
                    to: 8,
                    current_page: 1,
                },
                state: null,
                stateOptions: [
                    { id: 1, label: "Pahang" },
                    { id: 2, label: "Perak" },
                    { id: 3, label: "Melaka" }
                ],
                dropdownError: null
            };
        },
        mounted() {
            const vm = this;

            setTimeout(function () {
                vm.dateRange = {
                    from: "2020-01-01",
                    to: "2020-03-31"
                };
                vm.minDate = "2020-01-01";
            }, 5000);
        },
        methods: {
            formatCents,
            test(e) {
                console.log("input dropdown", e);
            },
            displayError(message) {
                console.table(message);
            }
        }
    };
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
