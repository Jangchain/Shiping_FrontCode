<template>
  <div class="identify-model">
    <div>
      <document-characteristics v-if="$route.params.subType == 'documentCharacteristics'"></document-characteristics>
      <keyword-panel v-else-if="$route.params.subType == 'keyword'"></keyword-panel>
      <document-fingerprint v-else-if="$route.params.subType == 'documentFingerprint'"></document-fingerprint>
      <database-fingerprint v-else-if="$route.params.subType == 'databaseFingerprint'"></database-fingerprint>
      <single-intelligent-learning v-else-if="$route.params.subType == 'singleIntelligentLearning'"></single-intelligent-learning>
      <match v-else-if="$route.params.subType == 'match'"></match>
      <multi-intelligent-learning v-else-if="$route.params.subType == 'multiIntelligentLearning'"></multi-intelligent-learning>
    </div>
  </div>
</template>
<script>
import DocumentCharacteristics from "./recognition/documentCharacteristicsCreate";
import KeywordPanel from "./recognition/keywordCreate";
import Match from "./recognition/matchCreate";
import DocumentFingerprint from "./recognition/documentFingerprintCreate";
import DatabaseFingerprint from "./recognition/databaseFingerprintCreate";
import SingleIntelligentLearning from "./recognition/singleIntelligentLearningCreate";
import MultiIntelligentLearning from "./recognition/multiIntelligentLearningCreate";
export default {
  beforeRouteUpdate(to, from, next) {
    next();
  },
  components: {
    DocumentCharacteristics,
    KeywordPanel,
    Match,
    DocumentFingerprint,
    DatabaseFingerprint,
    SingleIntelligentLearning,
    MultiIntelligentLearning
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
.identify-model {
  padding: 10px;
  .form-article {
  }
  .create-title {
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    padding-left: 10px;
    color: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    i {
      cursor: pointer;
    }
  }
  .create-content {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
