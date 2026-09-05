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

Status: In progress

- Define the hotel fields returned by Apex.
- Keep the contract reusable across MCP clients and agent surfaces.

#### MCP Tool Request

The first MCP tool should support a simple hotel lookup request.

| Field           | Type   | Required | Purpose                                                |
| --------------- | ------ | -------- | ------------------------------------------------------ |
| `hotelName`     | String | Yes      | User-provided hotel name or search phrase.             |
| `city`          | String | No       | Optional city filter when the hotel name is ambiguous. |
| `stateOrRegion` | String | No       | Optional state, province, or region filter.            |
| `country`       | String | No       | Optional country filter.                               |

#### Apex Hotel Payload

The Apex action should return one primary hotel object. Keep this payload focused on information that a card can render consistently across MCP clients and agent surfaces.

| Field           | Type    | Required | Widget Use                               |
| --------------- | ------- | -------- | ---------------------------------------- |
| `hotelId`       | String  | Yes      | Stable identifier for follow-up actions. |
| `name`          | String  | Yes      | Card title.                              |
| `city`          | String  | Yes      | Location line.                           |
| `stateOrRegion` | String  | No       | Location line.                           |
| `country`       | String  | No       | Location line.                           |
| `rating`        | Decimal | No       | Rating badge or supporting detail.       |
| `pricePerNight` | Decimal | No       | Price display.                           |
| `currencyCode`  | String  | No       | ISO currency code for the price.         |
| `checkInTime`   | String  | No       | Hotel policy detail.                     |
| `checkOutTime`  | String  | No       | Hotel policy detail.                     |
| `imageUrl`      | String  | No       | Public image shown on the card.          |
| `bookingUrl`    | String  | No       | Optional action URL.                     |
| `description`   | String  | No       | Short summary text.                      |

#### MCP Result Shape

The custom MCP server tool result should follow the Salesforce HXL MCP pattern:

```json
{
  "actionName": "searchHotels",
  "isSuccess": true,
  "outputValues": {
    "hotelInfo": {
      "hotelId": "hotel-001",
      "name": "Example Hotel",
      "city": "Chicago",
      "stateOrRegion": "IL",
      "country": "US",
      "rating": 4.7,
      "pricePerNight": 289,
      "currencyCode": "USD",
      "checkInTime": "3:00 PM",
      "checkOutTime": "11:00 AM",
      "imageUrl": "https://example.com/hotel.jpg",
      "bookingUrl": "https://example.com/book",
      "description": "A short hotel description."
    }
  }
}
```

#### Widget Attribute Contract

The HXL widget schema should stay flat, even though the MCP result shape is nested.

| Widget Attribute | Source Path                            |
| ---------------- | -------------------------------------- |
| `hotelId`        | `outputValues.hotelInfo.hotelId`       |
| `name`           | `outputValues.hotelInfo.name`          |
| `city`           | `outputValues.hotelInfo.city`          |
| `stateOrRegion`  | `outputValues.hotelInfo.stateOrRegion` |
| `country`        | `outputValues.hotelInfo.country`       |
| `rating`         | `outputValues.hotelInfo.rating`        |
| `pricePerNight`  | `outputValues.hotelInfo.pricePerNight` |
| `currencyCode`   | `outputValues.hotelInfo.currencyCode`  |
| `checkInTime`    | `outputValues.hotelInfo.checkInTime`   |
| `checkOutTime`   | `outputValues.hotelInfo.checkOutTime`  |
| `imageUrl`       | `outputValues.hotelInfo.imageUrl`      |
| `bookingUrl`     | `outputValues.hotelInfo.bookingUrl`    |
| `description`    | `outputValues.hotelInfo.description`   |

#### Naming Decisions

- Apex action class: `HotelSearchAction`
- Apex result model class: `HotelSearchResult`
- Apex nested hotel class: `HotelSearchResult.Hotel`
- MCP payload Lightning Type bundle: `hotelInfoOutputValues`
- MCP result wrapper Lightning Type bundle: `hotelInfoResult`
- HXL widget bundle: `hotelCard`

### 4. HXL Hotel Widget

Status: In progress

- Created the `hotelCard` HXL widget bundle.
- Defined a flat schema for card attributes.
- Mapped hotel fields to card content.
- Validated the `hotelCard` UiWidgetBundle with a Salesforce dry-run deployment.
- Deployed the `hotelCard` UiWidgetBundle to the `hxl-dev` org.

### 5. Apex MCP Tool

Status: In progress

- Created an invocable Apex action for hotel lookup.
- Added Apex tests for success, empty result, missing input, and no-match paths.
- Validated the Apex classes with a Salesforce dry-run deployment using `HotelSearchActionTest`.

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
