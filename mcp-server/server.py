# server/mcp_server.py
import uuid
import requests
from fastmcp import FastMCP
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Base URL of your Next.js API
NEXTJS_API_BASE = os.getenv("NEXTJS_API_BASE")
if not NEXTJS_API_BASE:
    raise EnvironmentError("Environment variable 'NEXTJS_API_BASE' not found.")
# Load credentials from environment variables
API_USERNAME = os.getenv("NEXTJS_API_USERNAME")
if not API_USERNAME:
    raise EnvironmentError("Environment variable 'NEXTJS_API_USERNAME' not found.")
API_PASSWORD = os.getenv("NEXTJS_API_PASSWORD")
if not API_PASSWORD:
    raise EnvironmentError("Environment variable 'NEXTJS_API_PASSWORD' not found.")

# Helper function to call Next.js API with basic auth
def call_nextjs_api(method, endpoint, data=None):
    url = f"{NEXTJS_API_BASE}/{endpoint}"
    auth = (API_USERNAME, API_PASSWORD)
    if method == "GET":
        response = requests.get(url, auth=auth)
    elif method == "POST":
        response = requests.post(url, json=data, auth=auth)
    elif method == "PUT":
        response = requests.put(url, json=data, auth=auth)
    elif method == "DELETE":
        response = requests.delete(url, auth=auth)
    else:
        raise Exception("Unsupported HTTP method")
    response.raise_for_status()
    return response.json()


# Initialize FastMCP server
mcp = FastMCP("Next.js API MCP", base_url="http://localhost:4000")


# --- Schema ---
@mcp.tool("schema")
def get_schema() -> dict:
    return call_nextjs_api("GET", "schema")


# --- Products ---
@mcp.tool("list_products")
def list_products() -> dict:
    return call_nextjs_api("GET", "products")


@mcp.tool("create_product")
def create_product(data: dict) -> dict:
    data_with_id = {**data, "id": str(uuid.uuid4())}
    return call_nextjs_api("POST", "products", data_with_id)


@mcp.tool("get_product")
def get_product(id: str) -> dict:
    return call_nextjs_api("GET", f"products/{id}")


@mcp.tool("update_product")
def update_product(id: str, data: dict) -> dict:
    return call_nextjs_api("PUT", f"products/{id}", data)


@mcp.tool("delete_product")
def delete_product(id: str) -> dict:
    call_nextjs_api("DELETE", f"products/{id}")
    return {"status": "deleted", "product_id": id}


# --- Product Offerings ---
@mcp.tool("list_product_offerings")
def list_product_offerings() -> dict:
    return call_nextjs_api("GET", "product-offerings")


@mcp.tool("create_product_offering")
def create_product_offering(data: dict) -> dict:
    data_with_id = {**data, "id": str(uuid.uuid4())}
    return call_nextjs_api("POST", "product-offerings", data_with_id)


@mcp.tool("get_product_offering")
def get_product_offering(id: str) -> dict:
    return call_nextjs_api("GET", f"product-offerings/{id}")


@mcp.tool("update_product_offering")
def update_product_offering(id: str, data: dict) -> dict:
    return call_nextjs_api("PUT", f"product-offerings/{id}", data)


@mcp.tool("delete_product_offering")
def delete_product_offering(id: str) -> dict:
    call_nextjs_api("DELETE", f"product-offerings/{id}")
    return {"status": "deleted", "offering_id": id}


# --- Product Offering Prices ---
@mcp.tool("list_product_offering_prices")
def list_product_offering_prices() -> dict:
    return call_nextjs_api("GET", "product-offering-prices")


@mcp.tool("create_product_offering_price")
def create_product_offering_price(data: dict) -> dict:
    data_with_id = {**data, "id": str(uuid.uuid4())}
    return call_nextjs_api("POST", "product-offering-prices", data_with_id)


@mcp.tool("get_product_offering_price")
def get_product_offering_price(id: str) -> dict:
    return call_nextjs_api("GET", f"product-offering-prices/{id}")


@mcp.tool("update_product_offering_price")
def update_product_offering_price(id: str, data: dict) -> dict:
    return call_nextjs_api("PUT", f"product-offering-prices/{id}", data)


@mcp.tool("delete_product_offering_price")
def delete_product_offering_price(id: str) -> dict:
    call_nextjs_api("DELETE", f"product-offering-prices/{id}")
    return {"status": "deleted", "price_id": id}


if __name__ == "__main__":
    mcp.run()
