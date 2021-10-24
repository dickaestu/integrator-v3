<template>
  <v-tab-item value="calibration-history">
    <v-simple-table height="170px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Calibration Date
            </th>
            <th class="text-left">
              Person & Company Name
            </th>
            <th class="text-left">
              Calibration Description
            </th>
            <th class="text-left">
              Status
            </th>
            <th class="text-left">
              Solved Note
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in calibrationHistoryList" :key="index">
            <td>
              {{
                new Intl.DateTimeFormat("ban-ID").format(
                  new Date(i.date * 1000)
                )
              }}
            </td>
            <td>
              {{ i.personAndCompanyName }}
            </td>
            <td>
              {{ i.description }}
            </td>
            <td>{{ i.status }}</td>
            <td>
              {{ i.note }}
            </td>
            <td>
              <v-menu>
                <template
                  v-slot:activator="{
                    on,
                    attrs
                  }"
                >
                  <v-icon v-bind="attrs" v-on="on">
                    mdi-dots-horizontal
                  </v-icon>
                </template>
                <v-list class="py-0">
                  <v-list-item
                    @click="editItem(i, index, `calibration`, `Calibration`)"
                  >
                    <v-list-item-title>
                      <v-icon small class="mr-1">
                        mdi-pencil
                      </v-icon>
                      Edit
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="
                      deleteItem(i, index, `delete-calibration`, `Calibration`)
                    "
                  >
                    <v-list-item-title>
                      <v-icon small class="mr-1">
                        mdi-delete
                      </v-icon>
                      Delete
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="downloadItemIssue(i)">
                    <v-list-item-title>
                      <v-icon small class="mr-1">
                        mdi-download
                      </v-icon>
                      Download
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-tab-item>
</template>
<script>
export default {
  name: "TabItemCalibration",
  props: {
    calibrationHistoryList: Array,
    deleteItem: Function,
    editItem: Function
  }
};
</script>
