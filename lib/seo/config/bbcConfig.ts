export const BBC_CONFIG = {
  pageProtection: {
    money: true,
    hub: "limited",
    weapon: "allowed"
  },

  execution: {
    maxActionsPerPage: 1,
    cooldownHours: 24
  },

  linking: {
    maxOutbound: 4,
    allowInjectOn: ["weapon"],
    blockOn: ["money"]
  },

  priority: {
    allow: ["P0", "P1"]
  },

  rewrite: {
    requireApproval: true,
    autoApply: false
  },

  inject: {
    requireTarget: true
  }
}
