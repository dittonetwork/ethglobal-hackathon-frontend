const w = window as any
w.__LOGS_DUMP = []

const Logger = {
  /**
   * Send anonymous info
   *
   * @param message message text
   */
  info(...message: any) {
    if (process.env.ALLOW_DEBUG) console.log("\n%c[Info]", "color: cornflowerblue", ...message, "\n\n")
  },

  /**
   * Send info with defined sender
   *
   * @param from sender
   * @param message message text
   */
  infoFrom(from: string, ...message: any) {
    if (process.env.ALLOW_DEBUG) console.log(`\n%c[${ from }]`, "color: cornflowerblue", ...message, "\n\n")

    w.__LOGS_DUMP.push(["INFO::" + from, message])
  },

  /**
   * Send anonymous error message
   *
   * @deprecated
   * @param message warning message
   */
  warning(...message: any) {
    if (process.env.ALLOW_DEBUG) console.log("\n%c[Warning]", "color: orange", ...message, "\n\n")
  },

  /**
   * Send warning message with defined sender
   *
   * @param from sender
   * @param message warning text or stack trace
   */
  warningFrom(from: string, ...message: any) {
    if (process.env.ALLOW_DEBUG) console.log(`\n%c[${ from }Warning]`, "color: orange", ...message, "\n\n")

    w.__LOGS_DUMP.push(["WARNING::" + from, message])
  },

  /**
   * Send anonymous error message
   *
   * @deprecated
   * @param message error text or stack trace
   */
  error(...message: any) {
    if (process.env.ALLOW_DEBUG) console.log("\n%c[Error]", "color: red", ...message, "\n\n")
  },

  /**
   * Send error message with defined sender
   *
   * @param from sender
   * @param message error text or stack trace
   */
  errorFrom(from: string, ...message: any) {
    if (process.env.ALLOW_DEBUG) console.log(`\n%c[${ from }Error]`, "color: red", ...message, "\n\n")

    w.__LOGS_DUMP.push(["ERROR::" + from, message])
  }
}

console.log("To download logs dump, write to this console next line: __DOWNLOAD_LOGS_DUMP()")
console.log("Please do not share this file with anyone other than Ditto Support")
export default Logger