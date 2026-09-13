import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { prepareBookingDownload } from "./download-links.mjs";
import { exportBooking } from "./export.mjs";
const server = new McpServer({
  name: "coral-cloud-local-export",
  version: "1.0.0"
});
server.registerTool(
  "export_booking_pdf",
  {
    title: "Save Coral Cloud Booking PDF",
    description:
      "Save a complete booking PDF with its exact experience photo. By default opens a native macOS Save As dialog so the user chooses the folder and filename. Use chooseLocation=false only when the user requests the default Downloads/Coral Cloud Bookings folder. Accepts a booking reference such as B-00001738 or Salesforce record ID. Uses the locally configured Salesforce CLI identity (which may differ from the remote connector). Never creates or changes Salesforce records or uploads files. No browser login or manual image attachment is required. Returns the saved local path; do not claim this is an in-chat attachment. Existing PDFs are not overwritten.",
    inputSchema: {
      booking: z.string().min(1).max(18),
      chooseLocation: z.boolean().default(true)
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true
    }
  },
  async ({ booking, chooseLocation }) => {
    try {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(await exportBooking(booking, chooseLocation))
          }
        ]
      };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: error.message }]
      };
    }
  }
);
server.registerTool(
  "prepare_booking_pdf_download",
  {
    title: "Create local booking PDF download link",
    description:
      "Prepare a complete booking PDF with the exact photo in memory and return a clickable temporary link for this Mac. Use when the user wants a download link or to choose where to save a PDF. Show the returned URL verbatim as a Markdown link labelled Save booking PDF on this Mac. It opens a local page; Choose location and save opens the native Save As dialog. Link expires after ten minutes or successful save, and stops working when this MCP server restarts. No Salesforce file, public hosting, or browser login. Do not invent or alter the link. Uses the configured local Salesforce CLI identity.",
    inputSchema: { booking: z.string().min(1).max(18) },
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true
    }
  },
  async ({ booking }) => {
    try {
      const result = await prepareBookingDownload(booking);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
    } catch (error) {
      return {
        isError: true,
        content: [{ type: "text", text: error.message }]
      };
    }
  }
);
await server.connect(new StdioServerTransport());
