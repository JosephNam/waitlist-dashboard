let cfg = {}

const defaults = {
  port: process.env.PORT0 || process.env.PORT || 3000,
  host: process.env.TASK_HOST || "localhost",
  env: process.env.ENV || "dev"
}

cfg = Object.assign(defaults, cfg)
cfg = Object.assign(cfg, require(`../config/${cfg.env}`))

module.exports = cfg
