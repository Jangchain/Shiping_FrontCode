<template>
  <div class="identify-model">
    <sub-type></sub-type>
    <!-- <div>
      <document-characteristics v-if="$route.params.subType == 'documentCharacteristics'"></document-characteristics>
      <keyword-panel v-else-if="$route.params.subType == 'keyword'"></keyword-panel>
      <document-fingerprint v-else-if="$route.params.subType == 'documentFingerprint'"></document-fingerprint>
      <database-fingerprint v-else-if="$route.params.subType == 'databaseFingerprint'"></database-fingerprint>
      <single-intelligent-learning v-else-if="$route.params.subType == 'singleIntelligentLearning'"></single-intelligent-learning>
      <match v-else-if="$route.params.subType == 'match'"></match>
      <multi-intelligent-learning v-else-if="$route.params.subType == 'multiIntelligentLearning'"></multi-intelligent-learning>
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import SubType from "./recognition/subTypes";
// import DocumentCharacteristics from "./recognition/documentCharacteristics";
// import KeywordPanel from "./recognition/keyword";
// import Match from "./recognition/match";
// import DocumentFingerprint from "./recognition/documentFingerprint";
// import DatabaseFingerprint from "./recognition/databaseFingerprint";
// import SingleIntelligentLearning from "./recognition/singleIntelligentLearning";
// import MultiIntelligentLearning from "./recognition/multiIntelligentLearning";
export default {
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    SubType
    // DocumentCharacteristics,
    // KeywordPanel,
    // Match,
    // DocumentFingerprint,
    // DatabaseFingerprint,
    // SingleIntelligentLearning,
    // MultiIntelligentLearning
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
.el-tooltip__popper {
  max-width: 450px;
}
</style>
