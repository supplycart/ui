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
                        :display="['address', 'lift_access']"
                        type="delivery"/>
                </div>
            </div>
            <div class="p-12">
                <h2 class="mb-2">Datetime</h2>
                <div class="mb-4">
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YYYY'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YYYY hh:mmA'"/>
                    <br>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'ddd, DD MMM YYYY'"/>
                    <DateTime
                        :value="currentTime"
                        :timezone="'Asia/Kuala_Lumpur'"
                        :format="'DD MMM YY'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { DatePicker, DateTime, DateRangePicker, Money, MoneyInput, Address } from "@supplycart/ui";
    import moment from "moment";

    export default {
        name: "App",
        components: {
            DateTime,
            DatePicker,
            DateRangePicker,
            Money,
            MoneyInput,
            Address
        },
        data() {
            return {
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
