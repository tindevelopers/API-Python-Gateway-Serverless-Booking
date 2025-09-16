# MCP Server Setup for Blog Writer SDK

This document describes the Model Context Protocol (MCP) server setup for the Blog Writer SDK project.

## Overview

The MCP server setup includes two servers:

### 1. Blog Writer SDK MCP Server
Provides tools for managing the Blog Writer SDK project, including:
- File operations (read, write, list)
- Deployment management
- Test execution
- Project health checks

### 2. Google Cloud MCP Server (Official)
Provides 17 Google Cloud tools for:
- Google Cloud Logging queries
- Cloud Spanner database operations
- Cloud Monitoring metrics
- Cloud Trace analysis
- Resource discovery and management

## Installation

The MCP server has been installed at the local project level with the following components:

### Dependencies
- `@modelcontextprotocol/server-filesystem` - Core MCP server functionality
- `@modelcontextprotocol/sdk` - MCP SDK for TypeScript/JavaScript
- `google-cloud-mcp` - Official Google Cloud MCP server with 17 tools

### Files Created
- `mcp-server.js` - Main MCP server implementation
- `package.json` - Node.js project configuration with MCP scripts
- `MCP_SERVER_SETUP.md` - This documentation

## Configuration

Both MCP servers have been added to your Cursor MCP configuration at `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "blog-writer-sdk": {
      "command": "node",
      "args": ["mcp-server.js"],
      "cwd": "/Users/gene/Library/CloudStorage/OneDrive-TheInformationNetworkLtd/-PROGRAMMING/API-As-A-Service/api-blog-writer-python-gcr",
      "env": {
        "NODE_ENV": "development"
      }
    },
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

## Available Tools

### Blog Writer SDK MCP Server Tools

### 1. `read_project_file`
Read a file from the Blog Writer SDK project.
- **Parameters**: `path` (relative path from project root)
- **Example**: Read `main.py` or `requirements.txt`

### 2. `write_project_file`
Write content to a file in the Blog Writer SDK project.
- **Parameters**: `path`, `content`
- **Example**: Update configuration files or create new files

### 3. `list_project_files`
List files and directories in the Blog Writer SDK project.
- **Parameters**: `path` (optional, defaults to project root), `recursive` (boolean)
- **Example**: Browse project structure

### 4. `deploy_to_cloud_run`
Deploy the Blog Writer SDK to Google Cloud Run.
- **Parameters**: `environment` (dev, staging, prod)
- **Example**: Deploy to development environment

### 5. `run_tests`
Run the test suite for the Blog Writer SDK.
- **Parameters**: `test_path` (optional specific test)
- **Example**: Run all tests or specific test files

### 6. `check_project_health`
Check the health and status of the Blog Writer SDK project.
- **Parameters**: None
- **Example**: Verify all essential files are present

### Google Cloud MCP Server Tools (17 Available)

The official Google Cloud MCP server provides comprehensive tools for:

1. **Cloud Logging Tools**
   - Query log entries across your Google Cloud resources
   - Filter logs by severity, time range, and resource type
   - Correlate logs with traces for debugging

2. **Cloud Spanner Tools**
   - Execute SQL queries against Spanner databases
   - Manage database schemas and operations
   - Monitor database performance

3. **Cloud Monitoring Tools**
   - Retrieve metrics from Google Cloud services
   - Create and manage alerting policies
   - Monitor resource utilization and performance

4. **Cloud Trace Tools**
   - Analyze distributed traces across services
   - Identify performance bottlenecks
   - Correlate traces with logs and metrics

5. **Resource Discovery Tools**
   - List and discover Google Cloud resources
   - Get resource metadata and configurations
   - Manage resource relationships

## Usage

### Starting the MCP Server
```bash
# From the project root
npm run mcp-server
# or
node mcp-server.js
```

### Testing the MCP Server
```bash
# Run the test script
node test-mcp.js
```

## Integration with Cursor

The MCP server is now integrated with Cursor and will be available when you:
1. Restart Cursor
2. Open this project
3. Use the MCP tools through the Cursor interface

## Google Cloud Run Deployment

The MCP server includes tools for deploying to Google Cloud Run:
- Uses existing deployment scripts in the `scripts/` directory
- Supports multiple environments (dev, staging, prod)
- Integrates with the project's Cloud Run configuration

## Troubleshooting

### Common Issues

1. **Module type warning**: Fixed by adding `"type": "module"` to `package.json`
2. **Permission errors**: Ensure `mcp-server.js` is executable (`chmod +x mcp-server.js`)
3. **Path issues**: Verify the `cwd` path in the MCP configuration matches your project location

### Verification

To verify the MCP server is working:
1. Run `node test-mcp.js` - should show "MCP Server test PASSED"
2. Check Cursor MCP configuration - server should appear in available tools
3. Test file operations through Cursor's MCP interface

## Security Notes

- The MCP server runs with the same permissions as the Node.js process
- File operations are restricted to the project directory
- Environment variables are passed through the MCP configuration
- No external network access is required for basic operations

## Next Steps

1. **Restart Cursor** to load the new MCP server
2. **Test the tools** through Cursor's MCP interface
3. **Deploy to Cloud Run** using the MCP deployment tools
4. **Customize tools** by modifying `mcp-server.js` as needed

## Support

For issues with the MCP server:
1. Check the server logs in Cursor's MCP console
2. Verify the configuration in `~/.cursor/mcp.json`
3. Test with `node test-mcp.js` for basic functionality
4. Review this documentation for troubleshooting steps
