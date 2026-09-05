# HXL MCP Hotel Card Implementation

## Goal

Create a Salesforce HXL hotel card that can render through MCP clients and agent surfaces such as Agentforce, ChatGPT, Claude, Slack, and future assistants.

## Current Branch

`feature/hxl-mcp-hotel-card`

## Target Architecture

1. A user asks about a hotel from an agent surface.
2. The MCP client calls a Salesforce MCP tool.
3. The Salesforce tool invokes Apex to return hotel data.
4. The MCP result uses a Custom Lightning Type mapped to an HXL widget.
5. The agent surface renders the hotel card UI instead of plain text when it supports HXL UI resources.

## Implementation Checkpoints

### 1. Environment Setup

Status: Complete

- Salesforce CLI is installed.
- A Salesforce org has been authorized by the user.
- HXL has been enabled in the Salesforce org.
- The work branch has been created from `main`.

### 2. Project Baseline

Status: In progress

- SFDX project API version updated to `67.0`.
- Add metadata folders for HXL widgets and Custom Lightning Types.

### 3. Hotel Data Contract

Status: Not started

- Define the hotel fields returned by Apex.
- Keep the contract reusable across MCP clients and agent surfaces.

### 4. HXL Hotel Widget

Status: Not started

- Create the `hotelCard` HXL widget.
- Define a flat schema for card attributes.
- Map hotel fields to card content and actions.

### 5. Apex MCP Tool

Status: Not started

- Create an invocable Apex action for hotel lookup.
- Add Apex tests for success, empty result, and invalid input paths.

### 6. Custom Lightning Types

Status: Not started

- Create a payload Lightning Type for hotel output values.
- Create an MCP result wrapper Lightning Type.
- Add `renderer.json` mapping from MCP result values to the HXL widget.

### 7. MCP Server Configuration

Status: Not started

- Create or retrieve the Salesforce MCP server metadata.
- Register the Apex action as an MCP tool.
- Register the HXL UI resource.
- Activate the MCP server.

### 8. MCP Client and Agent Surface Setup

Status: Not started

- Configure OAuth for the first MCP client.
- Connect the first agent surface to the Salesforce MCP server.
- Document notes for extending to Agentforce, ChatGPT, Claude, Slack, and other surfaces.

### 9. Validation

Status: Not started

- Deploy metadata to the org.
- Run Apex tests.
- Ask a hotel question from a connected agent surface.
- Confirm the card renders from the MCP tool response.

## Notes

- HXL requires Salesforce API version `67.0` or later.
- HXL widget schemas should stay flat, while MCP result data can be nested.
- The implementation should avoid client-specific naming where Salesforce MCP abstractions are reusable.
