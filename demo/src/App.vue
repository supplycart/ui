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
                <h2 class="mb-2">DatePicker</h2>
                <DatePicker class="p-2 rounded border border-gray-200 w-1/2"
                            placeholder="Select Date"/>
            </div>
            <div class="p-12">
                <h2 class="mb-2">DateRangePicker</h2>
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
                <h2 class="mb-2">TimePicker</h2>
                <TimePicker
                    v-model="time"
                    class="mb-4 p-2 rounded border border-gray-200 w-1/2"
                    placeholder="Select Time"/>
                <br>
                <pre>{value: {{ time }}}</pre>
            </div>
            <div class="p-12">
                <h2 class="mb-2">Money</h2>
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
                <h2 class="mb-2">MoneyInput</h2>
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
                <h2 class="mb-2">Billing Address</h2>
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
                <h2 class="mb-2">Datetime</h2>
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
                <h2 class="mb-2">Attachment</h2>
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
                <h2 class="mb-2">Input</h2>
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
                        class="w-1/2 mr-4"
                        input-class="p-2 rounded border border-gray-200"
                    />
                    <PhoneInput
                        label='Phone'
                        class="w-1/2 mr-4"
                        input-class="p-2 rounded border border-gray-200"
                        v-model="phone"
                        :required="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { 
        Address,
        AttachmentInput,
        ButtonAttachment,
        DatePicker, 
        DateRangePicker, 
        DateTime, 
        TimePicker, 
        Money, 
        MoneyInput, 
        TextInput,
        PhoneInput
    } from "@supplycart/ui";
    import moment from "moment";

    export default {
        name: "App",
        components: {
            Address,
            AttachmentInput,
            ButtonAttachment,
            DateTime,
            DatePicker,
            TimePicker,
            DateRangePicker,
            Money,
            MoneyInput,
            TextInput,
            PhoneInput
        },
        data() {
            return {
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
                phone: '019-1234566',
                time: null,
                currentTime: moment().format('YYYY-MM-DD HH:mm:ss')
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
