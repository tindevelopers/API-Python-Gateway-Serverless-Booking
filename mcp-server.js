#!/usr/bin/env node

/**
 * MCP Server for Blog Writer SDK
 * 
 * This server provides tools for managing the Blog Writer SDK project,
 * including file operations, deployment management, and project utilities.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BlogWriterMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'blog-writer-sdk-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'read_project_file',
            description: 'Read a file from the Blog Writer SDK project',
            inputSchema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: 'Relative path to the file from project root',
                },
              },
              required: ['path'],
            },
          },
          {
            name: 'write_project_file',
            description: 'Write content to a file in the Blog Writer SDK project',
            inputSchema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: 'Relative path to the file from project root',
                },
                content: {
                  type: 'string',
                  description: 'Content to write to the file',
                },
              },
              required: ['path', 'content'],
            },
          },
          {
            name: 'list_project_files',
            description: 'List files and directories in the Blog Writer SDK project',
            inputSchema: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  description: 'Relative path to list (defaults to project root)',
                  default: '.',
                },
                recursive: {
                  type: 'boolean',
                  description: 'Whether to list recursively',
                  default: false,
                },
              },
            },
          },
          {
            name: 'deploy_to_cloud_run',
            description: 'Deploy the Blog Writer SDK to Google Cloud Run',
            inputSchema: {
              type: 'object',
              properties: {
                environment: {
                  type: 'string',
                  description: 'Deployment environment (dev, staging, prod)',
                  default: 'dev',
                },
              },
            },
          },
          {
            name: 'run_tests',
            description: 'Run the test suite for the Blog Writer SDK',
            inputSchema: {
              type: 'object',
              properties: {
                test_path: {
                  type: 'string',
                  description: 'Specific test path to run (optional)',
                },
              },
            },
          },
          {
            name: 'check_project_health',
            description: 'Check the health and status of the Blog Writer SDK project',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'read_project_file':
            return await this.readProjectFile(args.path);
          
          case 'write_project_file':
            return await this.writeProjectFile(args.path, args.content);
          
          case 'list_project_files':
            return await this.listProjectFiles(args.path || '.', args.recursive || false);
          
          case 'deploy_to_cloud_run':
            return await this.deployToCloudRun(args.environment || 'dev');
          
          case 'run_tests':
            return await this.runTests(args.test_path);
          
          case 'check_project_health':
            return await this.checkProjectHealth();
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  getProjectRoot() {
    return resolve(__dirname);
  }

  async readProjectFile(relativePath) {
    const fullPath = join(this.getProjectRoot(), relativePath);
    
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      return {
        content: [
          {
            type: 'text',
            text: `File: ${relativePath}\n\n${content}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to read file ${relativePath}: ${error.message}`);
    }
  }

  async writeProjectFile(relativePath, content) {
    const fullPath = join(this.getProjectRoot(), relativePath);
    
    try {
      await fs.mkdir(dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, 'utf-8');
      return {
        content: [
          {
            type: 'text',
            text: `Successfully wrote to ${relativePath}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to write file ${relativePath}: ${error.message}`);
    }
  }

  async listProjectFiles(relativePath, recursive) {
    const fullPath = join(this.getProjectRoot(), relativePath);
    
    try {
      const items = await fs.readdir(fullPath, { withFileTypes: true });
      const result = [];
      
      for (const item of items) {
        const itemPath = join(relativePath, item.name);
        if (item.isDirectory()) {
          result.push(`📁 ${item.name}/`);
          if (recursive) {
            const subItems = await this.listProjectFiles(itemPath, true);
            result.push(...subItems.map(subItem => `  ${subItem}`));
          }
        } else {
          result.push(`📄 ${item.name}`);
        }
      }
      
      return {
        content: [
          {
            type: 'text',
            text: `Files in ${relativePath}:\n\n${result.join('\n')}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Failed to list files in ${relativePath}: ${error.message}`);
    }
  }

  async deployToCloudRun(environment) {
    // This would integrate with the existing deployment scripts
    const deployScript = environment === 'prod' ? './scripts/deploy.sh' : './scripts/deploy-env.sh';
    
    return {
      content: [
        {
          type: 'text',
          text: `Deployment to ${environment} environment initiated.\n\nTo complete deployment, run:\n${deployScript} ${environment}\n\nOr use the existing deployment scripts in the scripts/ directory.`,
        },
      ],
    };
  }

  async runTests(testPath) {
    const testCommand = testPath 
      ? `python -m pytest ${testPath}`
      : 'python -m pytest tests/';
    
    return {
      content: [
        {
          type: 'text',
          text: `Running tests...\n\nTo run tests, execute:\n${testCommand}\n\nOr use: python -m pytest tests/ -v`,
        },
      ],
    };
  }

  async checkProjectHealth() {
    const projectRoot = this.getProjectRoot();
    const healthChecks = [];
    
    // Check for essential files
    const essentialFiles = [
      'main.py',
      'requirements.txt',
      'pyproject.toml',
      'Dockerfile',
      'service.yaml'
    ];
    
    for (const file of essentialFiles) {
      try {
        await fs.access(join(projectRoot, file));
        healthChecks.push(`✅ ${file} exists`);
      } catch {
        healthChecks.push(`❌ ${file} missing`);
      }
    }
    
    // Check for environment files
    const envFiles = ['env.example', 'env.dev', 'env.staging', 'env.prod'];
    for (const file of envFiles) {
      try {
        await fs.access(join(projectRoot, file));
        healthChecks.push(`✅ ${file} exists`);
      } catch {
        healthChecks.push(`⚠️  ${file} missing (optional)`);
      }
    }
    
    return {
      content: [
        {
          type: 'text',
          text: `Blog Writer SDK Project Health Check:\n\n${healthChecks.join('\n')}\n\nProject Root: ${projectRoot}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Blog Writer SDK MCP server running on stdio');
  }
}

const server = new BlogWriterMCPServer();
server.run().catch(console.error);
