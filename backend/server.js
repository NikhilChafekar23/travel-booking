import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { gql } from "graphql-tag";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  from: String,
  to: String,
  adults: Number,
  children: Number,
  travelClass: String,
  departureOn: String,
  journeyType: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// GraphQL Schema
const typeDefs = gql`
  type Booking {
    id: ID!
    name: String!
    email: String!
    from: String!
    to: String!
    adults: Int!
    children: Int!
    travelClass: String!
    departureOn: String!
    journeyType: String!
  }

  type Query {
    bookings: [Booking!]!
  }

  type Mutation {
    addBooking(
      name: String!
      email: String!
      from: String!
      to: String!
      adults: Int!
      children: Int!
      travelClass: String!
      departureOn: String!
      journeyType: String!
    ): Booking!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    bookings: async () => await Booking.find(),
  },
  Mutation: {
    addBooking: async (_, args) => {
      const booking = new Booking(args);
      await booking.save();
      return booking;
    },
  },
};

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Express App Setup
const app = express();
server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
 
  const PORT = process.env.PORT || 4000;
  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
});
