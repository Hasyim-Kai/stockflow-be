--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Debian 14.12-1.pgdg120+1)
-- Dumped by pg_dump version 14.12 (Debian 14.12-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: QuantityUnit; Type: TYPE; Schema: public; Owner: postgresql
--

CREATE TYPE public."QuantityUnit" AS ENUM (
    'Pcs',
    'Liter',
    'MiliLiter',
    'Box',
    'Cup',
    'Bottle'
);


ALTER TYPE public."QuantityUnit" OWNER TO postgresql;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgresql
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'OUTLET_OWNER',
    'EMPLOYEE'
);


ALTER TYPE public."Role" OWNER TO postgresql;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: postgresql
--

CREATE TYPE public."TransactionType" AS ENUM (
    'IN',
    'OUT',
    'ADJUSTMENT'
);


ALTER TYPE public."TransactionType" OWNER TO postgresql;

--
-- Name: YesNoType; Type: TYPE; Schema: public; Owner: postgresql
--

CREATE TYPE public."YesNoType" AS ENUM (
    'YES',
    'NO'
);


ALTER TYPE public."YesNoType" OWNER TO postgresql;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cctv; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."Cctv" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(100) NOT NULL,
    link text NOT NULL,
    "outletId" integer NOT NULL
);


ALTER TABLE public."Cctv" OWNER TO postgresql;

--
-- Name: Cctv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."Cctv_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cctv_id_seq" OWNER TO postgresql;

--
-- Name: Cctv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."Cctv_id_seq" OWNED BY public."Cctv".id;


--
-- Name: Invoice; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."Invoice" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "invoiceGrandTotalPrice" double precision NOT NULL,
    "outletId" integer NOT NULL
);


ALTER TABLE public."Invoice" OWNER TO postgresql;

--
-- Name: Invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoice_id_seq" OWNER TO postgresql;

--
-- Name: Invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public."Invoice".id;


--
-- Name: Outlet; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."Outlet" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    address text NOT NULL
);


ALTER TABLE public."Outlet" OWNER TO postgresql;

--
-- Name: Outlet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."Outlet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Outlet_id_seq" OWNER TO postgresql;

--
-- Name: Outlet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."Outlet_id_seq" OWNED BY public."Outlet".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    "productCode" text NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "sealedQuantity" integer DEFAULT 0 NOT NULL,
    "openedQuantity" integer DEFAULT 0 NOT NULL,
    "quantityUnit" public."QuantityUnit" DEFAULT 'Bottle'::public."QuantityUnit" NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "outletId" integer NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgresql;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Product_id_seq" OWNER TO postgresql;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."Transaction" (
    id integer NOT NULL,
    "totalPrice" double precision NOT NULL,
    type public."TransactionType" DEFAULT 'IN'::public."TransactionType" NOT NULL,
    "isInvoiced" public."YesNoType" DEFAULT 'NO'::public."YesNoType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL,
    "outletId" integer NOT NULL,
    "invoiceId" integer
);


ALTER TABLE public."Transaction" OWNER TO postgresql;

--
-- Name: TransactionProduct; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."TransactionProduct" (
    id integer NOT NULL,
    quantity integer NOT NULL,
    "sumPrice" double precision NOT NULL,
    "transactionId" integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."TransactionProduct" OWNER TO postgresql;

--
-- Name: TransactionProduct_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."TransactionProduct_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TransactionProduct_id_seq" OWNER TO postgresql;

--
-- Name: TransactionProduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."TransactionProduct_id_seq" OWNED BY public."TransactionProduct".id;


--
-- Name: Transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."Transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Transaction_id_seq" OWNER TO postgresql;

--
-- Name: Transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."Transaction_id_seq" OWNED BY public."Transaction".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email text NOT NULL,
    password character varying(100) NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "outletId" integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgresql;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgresql
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgresql;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgresql
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgresql
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgresql;

--
-- Name: Cctv id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Cctv" ALTER COLUMN id SET DEFAULT nextval('public."Cctv_id_seq"'::regclass);


--
-- Name: Invoice id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Invoice" ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);


--
-- Name: Outlet id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Outlet" ALTER COLUMN id SET DEFAULT nextval('public."Outlet_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: Transaction id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Transaction" ALTER COLUMN id SET DEFAULT nextval('public."Transaction_id_seq"'::regclass);


--
-- Name: TransactionProduct id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."TransactionProduct" ALTER COLUMN id SET DEFAULT nextval('public."TransactionProduct_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Cctv; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Cctv" (id, "createdAt", name, link, "outletId") FROM stdin;
\.


--
-- Data for Name: Invoice; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Invoice" (id, "createdAt", "invoiceGrandTotalPrice", "outletId") FROM stdin;
\.


--
-- Data for Name: Outlet; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Outlet" (id, name, address) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Product" (id, "productCode", name, price, "sealedQuantity", "openedQuantity", "quantityUnit", description, "createdAt", "updatedAt", "outletId") FROM stdin;
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."Transaction" (id, "totalPrice", type, "isInvoiced", "createdAt", "updatedAt", "userId", "outletId", "invoiceId") FROM stdin;
\.


--
-- Data for Name: TransactionProduct; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."TransactionProduct" (id, quantity, "sumPrice", "transactionId", "productId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public."User" (id, name, email, password, role, "createdAt", "outletId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgresql
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
74805361-663c-410d-9fa3-70a6aa3b2dd9	b0f5c9f98fa18a24260d746c6f12d7a4cd606659c88a69c3ab89a9dc14d0e79d	2024-05-22 07:28:36.150302+00	20240522072835_init	\N	\N	2024-05-22 07:28:35.85076+00	1
\.


--
-- Name: Cctv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."Cctv_id_seq"', 1, false);


--
-- Name: Invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."Invoice_id_seq"', 1, false);


--
-- Name: Outlet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."Outlet_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, false);


--
-- Name: TransactionProduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."TransactionProduct_id_seq"', 1, false);


--
-- Name: Transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."Transaction_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgresql
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Cctv Cctv_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Cctv"
    ADD CONSTRAINT "Cctv_pkey" PRIMARY KEY (id);


--
-- Name: Invoice Invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);


--
-- Name: Outlet Outlet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Outlet"
    ADD CONSTRAINT "Outlet_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: TransactionProduct TransactionProduct_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."TransactionProduct"
    ADD CONSTRAINT "TransactionProduct_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: TransactionProduct_transactionId_productId_key; Type: INDEX; Schema: public; Owner: postgresql
--

CREATE UNIQUE INDEX "TransactionProduct_transactionId_productId_key" ON public."TransactionProduct" USING btree ("transactionId", "productId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgresql
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Cctv Cctv_outletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Cctv"
    ADD CONSTRAINT "Cctv_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES public."Outlet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Invoice Invoice_outletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Invoice"
    ADD CONSTRAINT "Invoice_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES public."Outlet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_outletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES public."Outlet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TransactionProduct TransactionProduct_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."TransactionProduct"
    ADD CONSTRAINT "TransactionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TransactionProduct TransactionProduct_transactionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."TransactionProduct"
    ADD CONSTRAINT "TransactionProduct_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES public."Transaction"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_invoiceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public."Invoice"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_outletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES public."Outlet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_outletId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgresql
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES public."Outlet"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

