<template>
    <v-dialog
        content-class="see_more_unit_list"
        v-model="dialogSeeMore"
        persistent
        max-width="50%"
    >
        <v-card>
        <span class="d-flex justify-end pt-2 pr-2">
            <v-icon
            class="close_dialog"
            @click="dialogSeeMore = false"
            >
            mdi-close-thick
            </v-icon>
        </span>
        <v-card-title class="justify-space-between">
            <h4 class="title_attach mb-0">
            Attached Devices
            <span class="text_active">Inlet SPARING</span>
            </h4>
            <!-- <span> -->
            <NuxtLink to="/configuration/device_list">
            <v-btn class="btnTransBgColor">See Details</v-btn>
            </NuxtLink>
            <!-- </span> -->
        </v-card-title>
        <v-card-text>
            <v-container fluid>
            <v-row>
                <v-col cols="12">
                <p class="mb-0">Sensors</p>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                <p class="mb-0">Controllers</p>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                <p class="mb-0">Actuators</p>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
                <v-col cols="2" class="pt-0">
                <div class="btnBgColor">BOD5</div>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "unit_list",
    props: ['dialogSeeMore'],
}
</script>