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
                       class="block mb-4 p-2 w-1/2"/>

                <pre>{value: {{ money.integer }} }</pre>

                <br>

                <Money :sign="true"
                       :value="money.decimal"
                       :int-value="false"
                       currency="MYR"
                       class="block mb-4 p-2 w-1/2"/>

                <pre>{value: {{ money.decimal }} }</pre>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">MoneyInput</h2>
                <MoneyInput v-model="moneyInput.integer"
                            currency="MYR"
                            class="mb-4 p-2 rounded border border-gray-200 w-1/2"/>

                <pre>{value: {{ moneyInput.integer }} }</pre>

                <br>

                <MoneyInput v-model="moneyInput.decimal"
                            :int-value="false"
                            currency="MYR"
                            class="mb-4 p-2 rounded border border-gray-200 w-1/2"/>

                <pre>{value: {{ moneyInput.decimal }} }</pre>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Display Address</h2>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Billing Address</h3>
                    <Address
                        v-model="malaysiaBillingAddress"
                        country="Malaysia"
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
                        type="billing"/>
                </div>
                <div class="mb-4">
                    <h3 class="font-bold mb-2">Delivery Address</h3>
                    <AddressForm
                        v-model="malaysiaDeliveryAddress"
                        :country="deliveryCountry"
                        :countries="['Malaysia', 'Indonesia', 'Hong Kong', 'Cambodia']"
                        type="delivery"/>
                </div>

                <div class="mb-4">
                    <h3 class="font-bold mb-2">General Address</h3>
                    <AddressForm
                        v-model="malaysiaDeliveryAddress"
                        :country="deliveryCountry"
                        :countries="['Malaysia', 'Indonesia', 'Hong Kong', 'Cambodia']"
                        :disableFields="['state','country']"
                        type="general"/>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Datetime</h2>
                <div class="mb-4">
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YY'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YYYY'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YYYY hh:mmA'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'ddd, DD MMM YYYY HH:mm'"/>
                    <DateTime
                        :value="currentTime"
                        :is-utc="true"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'ddd, DD MMM YYYY HH:mm'"/>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Attachment</h2>
                <div class="mb-4">
                    <ButtonAttachment 
                        v-model="attachments" 
                        class="p-1 rounded border border-gray-200 mb-4"
                        label="Upload Files"/>
                    <AttachmentInput
                        v-model="attachments"
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
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Button</h2>
                <div>
                    <SubmitButton 
                        class="p-2 rounded bg-blue-300 cursor-pointer mb-4" 
                        :loading="true"/>
                    <IconButton
                        class="p-2 rounded bg-blue-300 hover:bg-blue-200 ease-in ease-out cursor-pointer flex"
                        label="Button with Icon">
                        <FeatherIcon name="download" :size="15" class="inline-block mr-2"/>
                    </IconButton>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2 font-bold text-gray-600">Pagination</h2>
                <div>
                    <Paginate v-bind="meta" btn-class="py-2 px-3 border"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        Address,
        AddressForm,
        AttachmentInput,
        ButtonAttachment,
        Checkbox,
        DatePicker, 
        DateRangePicker, 
        DateTime, 
        TimePicker, 
        Money, 
        FeatherIcon,
        MoneyInput, 
        EmailInput,
        TextInput,
        PhoneInput,
        RemarksInput,
        QuantityInput,
        SubmitButton,
        IconButton,
        Paginate,
    } from "@supplycart/ui";
    import moment from "moment";

    export default {
        name: "App",
        components: {
            Address,
            AddressForm,
            AttachmentInput,
            ButtonAttachment,
            Checkbox,
            DateTime,
            DatePicker,
            TimePicker,
            DateRangePicker,
            Money,
            FeatherIcon,
            MoneyInput,
            EmailInput,
            TextInput,
            PhoneInput,
            RemarksInput,
            SubmitButton,
            QuantityInput,
            IconButton,
            Paginate
        },
        data() {
            return {
                deliveryCountry: 'Malaysia',
                attachments: [],
                minDate: moment().format("YYYY-MM-DD"),
                dateRange: {
                    from: "2020-03-19",
                    to: "2020-03-24"
                },
                moneyInput: {
                    integer: 1000,
                    decimal: 10.00
                },
                money: {
                    integer: 1000,
                    decimal: 10.00
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
                    country: "Malaysia",
                    einvoice_email: "will@supplycart.my",
                    registration_no: "REG0001"
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
                quantity: null,
                phone: '019-1234566',
                time: null,
                check: false,
                currentTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                meta: {
                    total: 180,
                    last_page: 10,
                    from: 1,
                    to: 8,
                    current_page: 1,
                }
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
