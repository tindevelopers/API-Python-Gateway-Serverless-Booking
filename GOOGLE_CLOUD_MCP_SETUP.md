# Google Cloud MCP Server Setup

This document describes the setup of the official Google Cloud MCP server for managing the Blog Writer SDK project on Google Cloud Platform.

## Overview

The Google Cloud MCP server provides comprehensive tools for managing Google Cloud resources including:
- Cloud Logging queries and analysis
- Cloud Spanner database operations
- Cloud Monitoring metrics and alerting
- Cloud Trace distributed tracing
- Resource discovery and management

## Installation

### 1. Google Cloud Authentication

The setup includes proper authentication with the following scopes:
- `https://www.googleapis.com/auth/cloud-platform` - Full platform access
- `https://www.googleapis.com/auth/cloud-run` - Cloud Run management
- `https://www.googleapis.com/auth/logging.read` - Logging read access
- `https://www.googleapis.com/auth/monitoring.read` - Monitoring read access
- `https://www.googleapis.com/auth/spanner.data` - Spanner data access
- `https://www.googleapis.com/auth/trace.readonly` - Trace read access

### 2. MCP Server Installation

```bash
# Install the official Google Cloud MCP server
npm install google-cloud-mcp@latest
```

### 3. Configuration

The MCP server is configured in `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "google-cloud-mcp": {
      "command": "node",
      "args": ["node_modules/google-cloud-mcp/dist/index.js"],
      "cwd": "/Users/gene/Library/CloudStorage/OneDrive-TheInformationNetworkLtd/-PROGRAMMING/API-As-A-Service/api-blog-writer-python-gcr",
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/gene/.config/gcloud/application_default_credentials.json",
        "GOOGLE_CLOUD_PROJECT": "sdk-ai-blog-writer",
        "GOOGLE_CLOUD_REGION": "us-central1"
      }
    }
  }
}
```

## Available Tools (17 Total)

### Cloud Logging Tools
- `query-logs` - Query log entries across Google Cloud resources
- `logs-time-range` - Filter logs by time range and severity

### Cloud Spanner Tools
- `execute-spanner-query` - Execute SQL queries against Spanner databases
- `list-spanner-tables` - List database tables
- `list-spanner-instances` - List Spanner instances
- `list-spanner-databases` - List databases
- `natural-language-spanner-query` - Natural language database queries
- `spanner-query-count` - Count query results

### Cloud Monitoring Tools
- `query-metrics` - Retrieve metrics from Google Cloud services
- `list-metric-types` - List available metric types
- `natural-language-metrics-query` - Natural language metrics queries

### Cloud Trace Tools
- `get-trace` - Get specific trace details
- `list-traces` - List distributed traces
- `find-traces-from-logs` - Correlate traces with logs
- `natural-language-trace-query` - Natural language trace queries

### Project Management Tools
- `set-project-id` - Set active project ID
- `get-project-id` - Get current project ID

## Google Cloud APIs Enabled

The following APIs are enabled for the `sdk-ai-blog-writer` project:
- ✅ Cloud Logging API
- ✅ Cloud Monitoring API
- ✅ Cloud Spanner API
- ✅ Cloud Trace API
- ✅ Cloud Run API

## Authentication Details

- **Account**: `developer@tin.info`
- **Project**: `sdk-ai-blog-writer`
- **Region**: `us-central1`
- **Credentials**: Application Default Credentials
- **Scopes**: Full platform access with specific service permissions

## Usage

### Starting the MCP Server
The server starts automatically when Cursor loads the MCP configuration.

### Testing the Setup
```bash
# Test the MCP server
node test-gcloud-mcp.js
```

### Accessing Tools
1. Restart Cursor to load the new MCP server
2. Use the Google Cloud tools through Cursor's MCP interface
3. All tools are available for managing your Google Cloud resources

## Project Management

The MCP server is configured to work with the `sdk-ai-blog-writer` project and provides tools for:

1. **Monitoring**: Track application performance and health
2. **Logging**: Query and analyze application logs
3. **Database**: Manage Spanner databases and queries
4. **Tracing**: Analyze distributed traces for debugging
5. **Deployment**: Monitor Cloud Run deployments

## Security

- Credentials are stored securely in `~/.config/gcloud/application_default_credentials.json`
- All API calls use proper authentication
- Scopes are limited to necessary permissions
- No sensitive data is exposed in configuration files

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure credentials are valid and have proper scopes
2. **API Not Enabled**: Verify all required APIs are enabled in the project
3. **Permission Denied**: Check that the account has necessary IAM roles

### Verification

To verify the setup is working:
1. Check that all 17 tools are available in Cursor
2. Test a simple query like `get-project-id`
3. Verify logs can be queried with `query-logs`

## Next Steps

1. **Restart Cursor** to load the Google Cloud MCP server
2. **Test the tools** through Cursor's MCP interface
3. **Deploy to Cloud Run** using the available tools
4. **Monitor your application** with the logging and monitoring tools

The Google Cloud MCP server is now ready for comprehensive Google Cloud management!


