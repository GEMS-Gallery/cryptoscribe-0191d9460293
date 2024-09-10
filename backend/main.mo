import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  // Define the Post type
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Time.Time;
  };

  // Stable variable to store posts
  stable var posts : List.List<Post> = List.nil();
  stable var nextId : Nat = 0;

  // Create a new post
  public func createPost(title: Text, body: Text, author: Text) : async Result.Result<Nat, Text> {
    let post : Post = {
      id = nextId;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(post, posts);
    nextId += 1;
    #ok(post.id)
  };

  // Get all posts in reverse chronological order
  public query func getPosts() : async [Post] {
    let reversedPosts = List.reverse(posts);
    List.toArray(reversedPosts)
  };
}
