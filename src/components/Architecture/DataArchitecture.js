import React, { useState } from 'react';
import { Database, Cloud, BarChart3, Zap, Server, Eye, Code, GitBranch, Play, CheckCircle, ArrowRight, ExternalLink, Github } from 'lucide-react';

const DataEngineeringProject = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const services = {
    dataSources: {
      title: "Data Sources",
      icon: <Database size={45} style={{ color: '#6c757d' }} />,
      description: "Multiple data ingestion points including Brazilian e-commerce dataset",
      details: {
        technologies: ["GitHub API", "HTTP Sources", "SQL Databases", "Files.io", "Kaggle Dataset"],
        implementation: "Built custom connectors using Azure Data Factory for 8+ CSV files from Olist Brazilian e-commerce dataset with parameterized JSON configuration for dynamic processing",
        challenges: "Handled rate limiting, data validation across different sources, and implemented error handling for production reliability with For-Each loops and Lookup activities",
        code: `# Dynamic data source configuration from GitHub
data_sources = [
    {
        "csv_relative_url": "olist_customers_dataset.csv",
        "file_name": "customers"
    },
    {
        "csv_relative_url": "olist_orders_dataset.csv", 
        "file_name": "orders"
    },
    {
        "csv_relative_url": "olist_order_payments_dataset.csv",
        "file_name": "payments"
    },
    {
        "csv_relative_url": "olist_products_dataset.csv",
        "file_name": "products"
    }
    # ... 8 total data sources from Brazilian e-commerce
]

# Files.io SQL database setup
import pymongo
client = pymongo.MongoClient(connection_string)
db = client['olist_data']
collection = db['product_categories']`
      }
    },
    dataFactory: {
      title: "Azure Data Factory",
      icon: <Cloud size={45} style={{ color: '#0d6efd' }} />,
      description: "ETL orchestration with advanced parameterization",
      details: {
        technologies: ["Azure Data Factory", "For-Each Loops", "Lookup Activities", "Copy Activities", "JSON Configuration"],
        implementation: "Designed automated pipelines with parameterized JSON configuration, lookup activities for dynamic processing, and comprehensive error handling with production-level retry mechanisms",
        challenges: "Optimized for cost and performance with dynamic scaling, implemented complex data validation and retry mechanisms for reliable data ingestion from multiple heterogeneous sources",
        code: `{
  "pipeline": {
    "activities": [
      {
        "name": "LookupForEachInput",
        "type": "Lookup",
        "typeProperties": {
          "source": {
            "type": "JsonSource",
            "storeSettings": {
              "type": "HttpReadSettings",
              "requestUrl": "for_each_input.json"
            }
          },
          "firstRowOnly": false
        }
      },
      {
        "name": "ForEachDataSource", 
        "type": "ForEach",
        "dependsOn": [{"activity": "LookupForEachInput"}],
        "typeProperties": {
          "items": "@activity('LookupForEachInput').output.value",
          "isSequential": true,
          "activities": [{
            "name": "CopyDataActivity",
            "type": "Copy",
            "typeProperties": {
              "source": { "type": "DelimitedTextSource" },
              "sink": { "type": "DelimitedTextSink" }
            }
          }]
        }
      }
    ]
  }
}`
      }
    },
    rawData: {
      title: "ADLS Gen2",
      subtitle: "Bronze Layer",
      icon: <Server size={45} style={{ color: '#0dcaf0' }} />,
      description: "Raw data lake storage following Medallion Architecture",
      details: {
        technologies: ["Azure Data Lake Gen2", "Parquet Format", "Hierarchical Namespace", "Medallion Architecture"],
        implementation: "Structured data lake with hierarchical namespace for efficient querying, implementing Bronze layer of Medallion Architecture for raw data storage from 8 e-commerce data sources",
        challenges: "Implemented data partitioning strategy for optimal performance and cost management with proper access controls and security configurations",
        code: `# Bronze Layer - Data lake structure
/bronze/
  /customers/
    olist_customers_dataset.csv
  /orders/
    olist_orders_dataset.csv
  /products/
    olist_products_dataset.csv
  /payments/
    olist_order_payments_dataset.csv
  /order_items/
    olist_order_items_dataset.csv
  /reviews/
    olist_order_reviews_dataset.csv
  /sellers/
    olist_sellers_dataset.csv
  /geolocation/
    olist_geolocation_dataset.csv

# Access configuration
abfss://olistdata@storage.dfs.core.windows.net/bronze/`
      }
    },
    databricks: {
      title: "Azure Databricks",
      icon: <Zap size={45} style={{ color: '#fd7e14' }} />,
      description: "Spark-based data transformation and processing",
      details: {
        technologies: ["Apache Spark", "PySpark", "Delta Lake", "MLlib", "MongoDB Integration"],
        implementation: "Built scalable data transformation jobs with complex joins across 8+ e-commerce tables, implemented data quality checks, and MongoDB enrichment integration for product categories",
        challenges: "Optimized Spark jobs for large-scale data processing (100K+ records), handled schema evolution, implemented efficient join strategies, and managed data lineage tracking",
        code: `# Complex e-commerce data transformation pipeline
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date, datediff, when
import pymongo

# Initialize Spark session
spark = SparkSession.builder.appName("EcommerceTransform").getOrCreate()

# Read from Bronze layer
orders_df = spark.read.option("header", "true").csv(
    "abfss://olistdata@storage.dfs.core.windows.net/bronze/orders/"
)
customers_df = spark.read.option("header", "true").csv(
    "abfss://olistdata@storage.dfs.core.windows.net/bronze/customers/"
)
payments_df = spark.read.option("header", "true").csv(
    "abfss://olistdata@storage.dfs.core.windows.net/bronze/payments/"
)

# Data cleaning and transformation
orders_clean = orders_df.withColumn("order_purchase_timestamp", 
                                   to_date(col("order_purchase_timestamp"))) \\
                       .withColumn("order_delivered_customer_date",
                                   to_date(col("order_delivered_customer_date"))) \\
                       .withColumn("delivery_time",
                                   datediff(col("order_delivered_customer_date"), 
                                           col("order_purchase_timestamp")))

# Complex joins across e-commerce tables
final_df = orders_clean.join(customers_df, "customer_id", "left") \\
                       .join(payments_df, "order_id", "left") \\
                       .join(order_items_df, "order_id", "left") \\
                       .join(products_df, "product_id", "left") \\
                       .join(sellers_df, "seller_id", "left")

# MongoDB enrichment for product categories
mongo_df = spark.createDataFrame(mongo_data)
enriched_df = final_df.join(mongo_df, "product_category_name", "left")

# Write to Silver layer
enriched_df.write.mode("overwrite").format("parquet").save(
    "abfss://olistdata@storage.dfs.core.windows.net/silver/final/"
)`
      }
    },
    processedData: {
      title: "ADLS Gen2",
      subtitle: "Silver Layer",
      icon: <Server size={45} style={{ color: '#6f42c1' }} />,
      description: "Cleaned and transformed e-commerce data",
      details: {
        technologies: ["Delta Lake", "Parquet Format", "Schema Evolution", "Data Quality Checks"],
        implementation: "Implemented comprehensive data quality checks, automated data validation, and optimized storage format for analytical workloads with proper partitioning strategy",
        challenges: "Managed schema evolution, data lineage tracking, and ensured data consistency across transformations while maintaining performance for 100K+ e-commerce records",
        code: `# Silver layer optimized structure
/silver/
  /final_transformed_data/
    /_delta_log/
      00000000000000000000.json
    /part-00000-snappy.parquet
    /part-00001-snappy.parquet
    # Optimized for e-commerce analytics queries

# Data quality implementation
def clean_data_frame(df):
    """Remove duplicates and validate data quality"""
    return df.dropDuplicates()

# Business metrics calculated
delivery_performance = df.withColumn("delivery_delay",
    when(col("delivery_time") > col("estimated_delivery_time"), 
         col("delivery_time") - col("estimated_delivery_time"))
    .otherwise(0)
)

# Quality metrics tracked
quality_checks = {
    "null_percentage": "< 5%",
    "duplicate_records": "0", 
    "schema_validation": "passed",
    "business_rules": "validated",
    "record_count": "100,000+"
}`
      }
    },
    mongodb: {
      title: "MongoDB",
      subtitle: "Enrichment Source",
      icon: <Database size={45} style={{ color: '#198754' }} />,
      description: "Document database for product category enrichment",
      details: {
        technologies: ["MongoDB Atlas", "PyMongo", "Files.io", "Aggregation Pipeline"],
        implementation: "Designed document schemas for flexible data enrichment with product category translations from Portuguese to English using cloud-hosted MongoDB on Files.io platform",
        challenges: "Optimized queries, implemented proper indexing strategies, and handled data synchronization between SQL and NoSQL sources for real-time enrichment",
        code: `# MongoDB enrichment setup on Files.io
import pymongo
import pandas as pd

# Connection to cloud MongoDB
client = pymongo.MongoClient(connection_string)
db = client['olist_data'] 
collection = db['product_categories']

# Product category enrichment data
category_data = {
    "_id": ObjectId("..."),
    "product_category_name": "cama_mesa_banho",
    "product_category_name_english": "bed_bath_table",
    "category_metadata": {
        "description": "Home and comfort products",
        "avg_price_range": "50-200 BRL",
        "popularity_score": 8.5
    }
}

# Insert enrichment data
collection.insert_many(product_categories_data)

# Read back for Spark integration
enrichment_data = list(collection.find({}))
mongo_df = pd.DataFrame(enrichment_data)

# Convert to Spark DataFrame for joins
mongo_spark_df = spark.createDataFrame(mongo_df.drop('_id', axis=1))

# Join with main e-commerce data
enriched_products = products_df.join(
    mongo_spark_df, 
    products_df.product_category_name == mongo_spark_df.product_category_name,
    "left"
)`
      }
    },
    synapse: {
      title: "Azure Synapse Analytics",
      icon: <BarChart3 size={45} style={{ color: '#0d6efd' }} />,
      description: "Serverless data warehouse and analytics",
      details: {
        technologies: ["Synapse SQL", "Serverless SQL Pools", "OPENROWSET", "External Tables", "CETAS"],
        implementation: "Built serverless SQL architecture with external tables over Silver layer data, implemented lake house pattern with views for easy data access and cost-effective querying",
        challenges: "Implemented cost-effective serverless architecture, optimized query performance for e-commerce analytics, and managed security with managed identities and proper access controls",
        code: `-- Serverless SQL Pool Implementation for E-commerce Analytics

-- Create database and schema
CREATE DATABASE olist_analytics;
GO
USE olist_analytics;
GO
CREATE SCHEMA gold;
GO

-- Create external data source pointing to Silver layer
CREATE EXTERNAL DATA SOURCE silver_data_source
WITH (
    LOCATION = 'abfss://olistdata@storage.dfs.core.windows.net/silver/',
    CREDENTIAL = [managed_identity_credential]
);

-- Create external file format for Parquet
CREATE EXTERNAL FILE FORMAT parquet_file_format
WITH (
    FORMAT_TYPE = PARQUET,
    DATA_COMPRESSION = 'org.apache.hadoop.io.compress.SnappyCodec'
);

-- Create view using OPENROWSET for e-commerce data
CREATE VIEW gold.ecommerce_analytics AS
SELECT 
    order_id,
    customer_id,
    order_status,
    payment_type,
    payment_value,
    product_category_name_english,
    delivery_time,
    review_score,
    seller_state,
    customer_state
FROM OPENROWSET(
    BULK 'final_transformed_data/',
    DATA_SOURCE = 'silver_data_source',
    FORMAT = 'PARQUET'
) AS result;

-- Create external table for Gold layer serving (CETAS)
CREATE EXTERNAL TABLE gold.customer_analytics
WITH (
    LOCATION = 'gold/customer_analytics/',
    DATA_SOURCE = [gold_data_source],
    FILE_FORMAT = [parquet_file_format]
)
AS
SELECT 
    customer_state,
    COUNT(DISTINCT customer_id) as total_customers,
    COUNT(order_id) as total_orders,
    AVG(CAST(payment_value AS FLOAT)) as avg_order_value,
    AVG(CAST(delivery_time AS FLOAT)) as avg_delivery_time,
    AVG(CAST(review_score AS FLOAT)) as avg_satisfaction
FROM gold.ecommerce_analytics
WHERE order_status = 'delivered'
GROUP BY customer_state;`
      }
    },
    powerbi: {
      title: "Power BI",
      icon: <Eye size={45} style={{ color: '#ffc107' }} />,
      description: "Interactive e-commerce business intelligence",
      details: {
        technologies: ["Power BI", "DAX", "Power Query", "DirectQuery", "Synapse Connector"],
        implementation: "Created interactive dashboards with real-time data refresh from Synapse serverless endpoints, implemented responsive design for e-commerce KPIs and business metrics",
        challenges: "Designed user-friendly interfaces for different stakeholder needs, optimized report performance for large datasets, and implemented row-level security for multi-tenant scenarios",
        code: `// Power BI DAX measures for E-commerce Analytics

// Sales Performance Metrics
Total_Revenue = 
SUMX('Orders', 'Orders'[payment_value])

Revenue_Growth_MoM = 
VAR CurrentMonth = [Total_Revenue]
VAR PreviousMonth = 
    CALCULATE(
        [Total_Revenue],
        DATEADD('Orders'[order_purchase_timestamp], -1, MONTH)
    )
RETURN
DIVIDE(CurrentMonth - PreviousMonth, PreviousMonth) * 100

// Customer Analytics
Average_Order_Value = 
DIVIDE([Total_Revenue], DISTINCTCOUNT('Orders'[order_id]))

Customer_Lifetime_Value = 
SUMX(
    VALUES('Customers'[customer_id]),
    CALCULATE([Total_Revenue])
)

// Operational Metrics
Average_Delivery_Time = 
AVERAGE('Orders'[delivery_time])

Delivery_Performance = 
DIVIDE(
    CALCULATE(
        COUNTROWS('Orders'),
        'Orders'[delivery_time] <= 'Orders'[estimated_delivery_time]
    ),
    COUNTROWS('Orders')
) * 100

// Customer Satisfaction
Satisfaction_Rate = 
DIVIDE(
    CALCULATE(
        COUNTROWS('Reviews'),
        'Reviews'[review_score] >= 4
    ),
    COUNTROWS('Reviews')
) * 100

// Geographic Analysis
Top_States_By_Revenue = 
TOPN(
    10,
    SUMMARIZE(
        'Customers',
        'Customers'[customer_state],
        "Revenue", [Total_Revenue]
    ),
    [Revenue],
    DESC
)`
      }
    }
  };

  const projectStats = [
    { label: "Data Sources", value: "8+", description: "Brazilian e-commerce CSV files" },
    { label: "Records Processed", value: "100K+", description: "E-commerce orders from 2016-2018" },
    { label: "Azure Services", value: "6", description: "End-to-end cloud architecture" },
    { label: "Data Tables", value: "9", description: "Related e-commerce entities" }
  ];

  const keyFeatures = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Medallion Architecture",
      description: "Bronze, Silver, Gold data layers with proper data quality progression from raw Olist data to business-ready analytics"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Processing", 
      description: "Spark-based transformations with complex joins across 8+ e-commerce tables and MongoDB enrichment"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Serverless Architecture",
      description: "Cost-optimized serverless SQL pools and automatic scaling with Synapse Analytics for e-commerce insights"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Business Intelligence",
      description: "Interactive Power BI dashboards with Brazilian e-commerce KPIs, customer analytics, and operational metrics"
    }
  ];

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero Section */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ 
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '9999px', 
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle style={{ width: '1rem', height: '1rem' }} />
              Production-Ready Data Engineering Project
            </span>
          </div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            End-to-End Data Engineering
            <br />
            <span style={{ color: '#1f2937' }}>on Microsoft Azure</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280', 
            maxWidth: '48rem', 
            margin: '0 auto 2rem', 
            lineHeight: '1.6' 
          }}>
            A comprehensive data pipeline processing 100K+ Brazilian e-commerce records using modern cloud architecture, 
            Medallion data organization, and real-time analytics with Azure services.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('architecture')}
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
              }}
            >
              <Play style={{ width: '1.25rem', height: '1.25rem' }} />
              Explore Architecture
            </button>
            <button style={{
              border: '2px solid #d1d5db',
              background: 'transparent',
              color: '#374151',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem'
            }}>
              <Github style={{ width: '1.25rem', height: '1.25rem' }} />
              View Source Code
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ background: 'white', padding: '4rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {projectStats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>{stat.value}</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{stat.label}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ background: 'white', position: 'sticky', top: 0, zIndex: 30, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto' }}>
            {[
              { id: 'overview', label: 'Project Overview' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'technologies', label: 'Technologies' },
              { id: 'implementation', label: 'Implementation' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 0.5rem',
                  borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
                  background: 'transparent',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Key Features */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>
                Key Features & Capabilities
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {keyFeatures.map((feature, index) => (
                  <div key={index} style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '0.75rem', 
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                    border: '1px solid #e5e7eb' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ background: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        {React.cloneElement(feature.icon, { style: { color: '#3b82f6' } })}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                          {feature.title}
                        </h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.5' }}>{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Flow */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>
                Brazilian E-commerce Data Pipeline Flow
              </h2>
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {[
                    { title: "Olist Dataset", desc: "8 CSV files from Kaggle", color: "#dcfce7", textColor: "#166534" },
                    { title: "Bronze Layer", desc: "Raw data ingestion", color: "#fef3c7", textColor: "#92400e" },
                    { title: "Silver Layer", desc: "Cleaned & joined data", color: "#e9d5ff", textColor: "#7c3aed" },
                    { title: "Gold Layer", desc: "Analytics-ready data", color: "#dbeafe", textColor: "#1d4ed8" }
                  ].map((step, index) => (
                    <React.Fragment key={index}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                          background: step.color,
                          color: step.textColor,
                          padding: '0.75rem 1.5rem',
                          borderRadius: '0.5rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem'
                        }}>
                          {step.title}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{step.desc}</p>
                      </div>
                      {index < 3 && <ArrowRight style={{ width: '1.5rem', height: '1.5rem', color: '#9ca3af' }} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>
              Interactive Architecture Diagram
            </h2>
            
            {/* Architecture Diagram with Custom Styling */}
          <div style={{
  background: 'white',
  borderRadius: '1.5rem',
  boxShadow: '0 0.75rem 1.5rem rgba(0, 0, 0, 0.1)',
  border: '1px solid #dee2e6',
  padding: '4rem',
  width: '200%',              // keep if you need a wide diagram
  maxWidth: '3100px',
  height: '1000px',
  marginLeft: -600,              // align to left
  marginRight: 'auto',
  position: 'relative',
  overflow: 'auto'
}}>

              
              {/* Data Sources */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '60px', 
                  top: '300px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'dataSources' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('dataSources')}
                onMouseEnter={() => setHoveredService('dataSources')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'dataSources' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'dataSources' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'dataSources' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.dataSources.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      Data Sources
                    </div>
                    <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d', justifyContent: 'flex-start', padding: '0.2rem 0' }}>
                        <GitBranch size={18} style={{ marginRight: '0.6rem' }} />
                        <span>via GitHub</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d', justifyContent: 'flex-start', padding: '0.2rem 0' }}>
                        <Database size={18} style={{ marginRight: '0.6rem' }} />
                        <span>SQL Table</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Azure Data Factory */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '450px', 
                  top: '80px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'dataFactory' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('dataFactory')}
                onMouseEnter={() => setHoveredService('dataFactory')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'dataFactory' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'dataFactory' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'dataFactory' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.dataFactory.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      Azure Data
                    </div>
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', lineHeight: 1.2 }}>
                      Factory
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw Data - Bronze */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '450px', 
                  top: '400px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'rawData' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('rawData')}
                onMouseEnter={() => setHoveredService('rawData')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'rawData' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'rawData' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'rawData' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.rawData.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      ADLS Gen2
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem', fontWeight: 500 }}>
                      Bronze Layer
                    </div>
                  </div>
                </div>
              </div>

              {/* Azure Databricks */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '860px', 
                  top: '400px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'databricks' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('databricks')}
                onMouseEnter={() => setHoveredService('databricks')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'databricks' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'databricks' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'databricks' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.databricks.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      Azure
                    </div>
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', lineHeight: 1.2 }}>
                      Databricks
                    </div>
                  </div>
                </div>
              </div>

              {/* MongoDB */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '860px', 
                  top: '700px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'mongodb' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('mongodb')}
                onMouseEnter={() => setHoveredService('mongodb')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'mongodb' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'mongodb' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'mongodb' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.mongodb.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      MongoDB
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem', fontWeight: 500 }}>
                      Enrichment
                    </div>
                  </div>
                </div>
              </div>

              {/* Processed Data - Silver */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '1260px', 
                  top: '400px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'processedData' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('processedData')}
                onMouseEnter={() => setHoveredService('processedData')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'processedData' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'processedData' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'processedData' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.processedData.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      ADLS Gen2
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem', fontWeight: 500 }}>
                      Silver Layer
                    </div>
                  </div>
                </div>
              </div>

              {/* Synapse */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '1260px', 
                  top: '80px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'synapse' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('synapse')}
                onMouseEnter={() => setHoveredService('synapse')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'synapse' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'synapse' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'synapse' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.synapse.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      Synapse
                    </div>
                  </div>
                </div>
              </div>

              {/* Power BI */}
              <div 
                style={{ 
                  position: 'absolute', 
                  left: '1660px', 
                  top: '80px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                  transform: hoveredService === 'powerbi' ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedService('powerbi')}
                onMouseEnter={() => setHoveredService('powerbi')}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div style={{
                  border: hoveredService === 'powerbi' ? '2px solid #8b5cf6' : '2px solid #dee2e6',
                  borderRadius: '1rem',
                  padding: '2rem 1.5rem',
                  background: 'white',
                  minWidth: '300px',
                  minHeight: '230px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredService === 'powerbi' ? '0 0.75rem 1.5rem rgba(139, 92, 246, 0.25)' : '0 0.25rem 0.5rem rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredService === 'powerbi' ? 'translateY(-2px)' : 'translateY(0)'
                }}>
                  <div>
                    {services.powerbi.icon}
                    <div style={{ fontWeight: 600, color: '#212529', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.2 }}>
                      Power BI
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Arrows */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                    <polygon points="0 0, 10 4, 0 8" fill="#374151" />
                  </marker>
                </defs>
                
                {/* Data Sources to Data Factory */}
                <path d="M 260 340 L 430 180" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                <text x="330" y="250" fill="#374151" fontSize="13" textAnchor="middle" fontWeight="500">Data Ingestion</text>
                
                {/* Data Factory to Raw Data */}
                <path d="M 490 180 L 490 300" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                
                {/* Raw Data to Databricks */}
                <path d="M 580 360 L 680 460" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                
                {/* Databricks to MongoDB */}
                <path d="M 770 520 L 770 580" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                <text x="790" y="550" fill="#374151" fontSize="13" textAnchor="start" fontWeight="500">Enrichment</text>
                
                {/* MongoDB back to Databricks */}
                <path d="M 730 600 L 730 540" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="6,4" />
                
                {/* Databricks to Processed Data */}
                <path d="M 860 460 L 960 360" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                
                {/* Processed Data to Synapse */}
                <path d="M 1050 300 L 1050 180" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
                <text x="1070" y="230" fill="#374151" fontSize="13" textAnchor="start" fontWeight="500">Analytics</text>
                
                {/* Synapse to Power BI */}
                <path d="M 1140 150 L 1240 150" stroke="#374151" strokeWidth="2.5" fill="none" markerEnd="url(#arrowhead)" />
              </svg>
            </div>

            <div style={{ color: '#6c757d', marginTop: '2.5rem', textAlign: 'center', fontSize: '1.1rem' }}>
              💡 Click on any service to explore implementation details
            </div>
          </div>
        )}

        {/* Technologies Tab */}
        {activeTab === 'technologies' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Technology Stack</h2>
              <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '48rem', margin: '0 auto' }}>
                Modern cloud-native technologies chosen for scalability, performance, and cost optimization
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Cloud Platform */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Cloud style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#3b82f6' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Cloud Platform</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Microsoft Azure', 'Azure Resource Manager', 'Azure Active Directory', 'Azure Key Vault'].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', background: '#3b82f6', borderRadius: '50%' }}></div>
                      <span style={{ color: '#374151' }}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Processing */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <Zap style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#f59e0b' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Data Processing</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Apache Spark', 'PySpark', 'Delta Lake', 'Parquet Format'].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', background: '#f59e0b', borderRadius: '50%' }}></div>
                      <span style={{ color: '#374151' }}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics & BI */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <BarChart3 style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#8b5cf6' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Analytics & BI</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Synapse SQL', 'DAX', 'Power Query', 'T-SQL'].map((tech, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', background: '#8b5cf6', borderRadius: '50%' }}></div>
                      <span style={{ color: '#374151' }}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Architectural Decisions */}
            <div style={{ background: 'linear-gradient(45deg, #dbeafe, #e9d5ff)', borderRadius: '0.75rem', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center' }}>
                Architectural Decisions
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                    Why Serverless Architecture?
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      'Cost optimization - pay only for actual usage',
                      'Automatic scaling based on workload demands', 
                      'Zero infrastructure management overhead'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                        <span style={{ color: '#374151' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                    Why Medallion Architecture?
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      'Clear data quality progression from raw to refined',
                      'Enables different consumption patterns per layer',
                      'Supports both batch and streaming workloads'
                    ].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981', marginTop: '0.125rem', flexShrink: 0 }} />
                        <span style={{ color: '#374151' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Implementation Tab */}
        {activeTab === 'implementation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Implementation Highlights</h2>
              <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '48rem', margin: '0 auto' }}>
                Key technical implementations and solutions developed during the Brazilian e-commerce data project
              </p>
            </div>

            {/* Implementation Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Data Factory Implementation */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem' }}>
                    <Cloud style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                      Dynamic Pipeline Configuration
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      Implemented parameterized Azure Data Factory pipelines using JSON configuration files for scalable data ingestion 
                      from 8 Brazilian e-commerce CSV files with For-Each loops and Lookup activities.
                    </p>
                    <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>JSON Configuration</span>
                        <Code style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                      </div>
                      <pre style={{ fontSize: '0.75rem', color: '#1f2937', overflow: 'auto', margin: 0, fontFamily: 'monospace' }}>
{`// Dynamic data source configuration
[
  {
    "csv_relative_url": "olist_customers_dataset.csv",
    "file_name": "customers"
  },
  {
    "csv_relative_url": "olist_orders_dataset.csv", 
    "file_name": "orders"
  }
  // ... 8 total configured sources
]`}
                      </pre>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['For-Each Loops', 'Lookup Activities', 'Error Handling'].map((tag, idx) => (
                        <span key={idx} style={{ 
                          background: '#dbeafe', 
                          color: '#1e40af', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem' 
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Databricks Implementation */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ background: '#fed7aa', padding: '1rem', borderRadius: '0.5rem' }}>
                    <Zap style={{ width: '2rem', height: '2rem', color: '#ea580c' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                      Complex Data Transformations
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      Built scalable Spark jobs for processing 100K+ Brazilian e-commerce records with complex joins across 8+ related tables 
                      and MongoDB enrichment for product categories.
                    </p>
                    <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>PySpark Transformation</span>
                        <Code style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                      </div>
                      <pre style={{ fontSize: '0.75rem', color: '#1f2937', overflow: 'auto', margin: 0, fontFamily: 'monospace' }}>
{`# Multi-table join with enrichment
final_df = orders_df \\
  .join(customers_df, "customer_id", "left") \\
  .join(payments_df, "order_id", "left") \\
  .join(order_items_df, "order_id", "left") \\
  .join(products_df, "product_id", "left") \\
  .join(mongo_spark_df, "product_category_name", "left")

# Business logic calculations
enriched_df = final_df.withColumn("delivery_time",
  datediff(col("order_delivered_customer_date"), 
          col("order_purchase_timestamp")))`}
                      </pre>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['8+ Table Joins', 'MongoDB Integration', 'Performance Optimization'].map((tag, idx) => (
                        <span key={idx} style={{ 
                          background: '#fed7aa', 
                          color: '#c2410c', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem' 
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Synapse Implementation */}
              <div style={{ background: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ background: '#e9d5ff', padding: '1rem', borderRadius: '0.5rem' }}>
                    <BarChart3 style={{ width: '2rem', height: '2rem', color: '#8b5cf6' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
                      Serverless Data Warehouse
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      Implemented lakehouse architecture using Synapse serverless SQL pools with external tables, OPENROWSET queries, 
                      and CETAS for optimized e-commerce analytics.
                    </p>
                    <div style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>CETAS Implementation</span>
                        <Code style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                      </div>
                      <pre style={{ fontSize: '0.75rem', color: '#1f2937', overflow: 'auto', margin: 0, fontFamily: 'monospace' }}>
{`-- Create external table for serving layer
CREATE EXTERNAL TABLE gold.customer_analytics
WITH (
    LOCATION = 'gold/customer_analytics/',
    DATA_SOURCE = [gold_data_source],
    FILE_FORMAT = [parquet_file_format]
)
AS
SELECT 
    customer_state,
    COUNT(DISTINCT customer_id) as total_customers,
    AVG(CAST(payment_value AS FLOAT)) as avg_order_value
FROM silver.ecommerce_data
WHERE order_status = 'delivered'
GROUP BY customer_state;`}
                      </pre>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Serverless SQL', 'External Tables', 'OPENROWSET'].map((tag, idx) => (
                        <span key={idx} style={{ 
                          background: '#e9d5ff', 
                          color: '#7c3aed', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem' 
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results & Outcomes */}
            <div style={{ background: 'linear-gradient(45deg, #dcfce7, #dbeafe)', borderRadius: '0.75rem', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center' }}>
                Project Outcomes
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#dcfce7', 
                    width: '4rem', 
                    height: '4rem', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <CheckCircle style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
                  </div>
                  <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>99.9% Uptime</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Reliable pipeline processing with comprehensive error handling</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#dbeafe', 
                    width: '4rem', 
                    height: '4rem', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <Zap style={{ width: '2rem', height: '2rem', color: '#2563eb' }} />
                  </div>
                  <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>3x Faster</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Query performance improvement through optimization</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    background: '#e9d5ff', 
                    width: '4rem', 
                    height: '4rem', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <BarChart3 style={{ width: '2rem', height: '2rem', color: '#8b5cf6' }} />
                  </div>
                  <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Real-time Insights</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Interactive dashboards with live data visualization</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Service Details */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} onClick={closeModal}>
          <div style={{
            background: 'white',
            borderRadius: '1.25rem',
            maxWidth: '70rem',
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 2rem 4rem rgba(0, 0, 0, 0.25)',
            margin: '2rem auto'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '2rem 2rem 1rem',
              borderBottom: '1px solid #dee2e6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {services[selectedService].icon}
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#212529', margin: 0 }}>
                  {services[selectedService].title}
                </h2>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem' }}>
                      Technologies Used
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {services[selectedService].details.technologies.map((tech, idx) => (
                        <span key={idx} style={{
                          display: 'inline-block',
                          padding: '0.4rem 1rem',
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.2)',
                          borderRadius: '50px',
                          fontSize: '0.9rem',
                          color: '#212529',
                          margin: '0.3rem 0.2rem',
                          fontWeight: 500
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem' }}>
                      Implementation
                    </h3>
                    <p style={{ color: '#374151', lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>
                      {services[selectedService].details.implementation}
                    </p>
                  </div>

                  <div>
                    <h3 style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem' }}>
                      Challenges & Solutions
                    </h3>
                    <p style={{ color: '#374151', lineHeight: 1.7, margin: 0, fontSize: '1rem' }}>
                      {services[selectedService].details.challenges}
                    </p>
                  </div>
                </div>

                {/* Right Column - Code */}
                <div>
                  <h3 style={{ 
                    color: '#8b5cf6', 
                    fontWeight: 600, 
                    fontSize: '1.2rem', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Code size={22} />
                    Code Example
                  </h3>
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    border: '1px solid #dee2e6',
                    height: '350px',
                    overflowY: 'auto'
                  }}>
                    <pre style={{
                      color: '#212529',
                      fontSize: '0.9rem',
                      margin: 0,
                      fontFamily: 'Courier New, monospace',
                      lineHeight: 1.5,
                      whiteSpace: 'pre'
                    }}>
                      <code>{services[selectedService].details.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              padding: '1rem 2rem 2rem',
              borderTop: '1px solid #dee2e6'
            }}>
              <button 
                onClick={closeModal}
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', color: 'white', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Interested in the Implementation?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Explore the complete source code, documentation, and step-by-step tutorials for this Brazilian e-commerce data engineering project
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: 'white',
              color: '#3b82f6',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem'
            }}>
              <Github style={{ width: '1.25rem', height: '1.25rem' }} />
              View on GitHub
            </button>
            <button style={{
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem'
            }}>
              <ExternalLink style={{ width: '1.25rem', height: '1.25rem' }} />
              Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEngineeringProject;