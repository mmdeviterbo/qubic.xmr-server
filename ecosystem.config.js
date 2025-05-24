module.exports = {
  apps : [{
    name   : "qubic-xmr-server",
    script : "./src/index.ts",
    max_memory_restart: '1G',
    instances: "max",
    exec_mode : "cluster",
    node_args: "-r dotenv/config",
    args: "dotenv_config_path=./.env",
    watch : true,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
