from sentence_transformers import SentenceTransformer, util

def sentSim(sentences1, sentences2):

    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Two lists of sentences
    # sentences1 = [
    #     "This depends on your specific needs. Cloud-based solutions with auto-scaling features might be ideal for unpredictable traffic surges. Consider NoSQL databases for flexible data storage and geographically distributed servers for low latency.",
    #     "This depends on your specific needs. Cloud-based solutions with auto-scaling features might be ideal for unpredictable traffic surges. Consider NoSQL databases for flexible data storage and geographically distributed servers for low latency.",
    #     "The new movie is awesome",
    # ]

    # sentences2 = [
    #     "WebSockets or message queues could be options for real-time communication. Consider sharding databases for parallel processing and caching mechanisms for frequently accessed data. Prioritize efficient data structures and algorithms for message handling and delivery.",
    #     "It all depends on what you need! Cloud stuff with automatic scaling can handle crazy traffic spikes. For storing your data flexibly, consider NoSQL databases. Spreading servers around the globe keeps things speedy for everyone, no matter where they are.",
    #     "The new movie is so great",
    # ]

    # Compute embedding for both lists
    embeddings1 = model.encode(sentences1, convert_to_tensor=True)
    embeddings2 = model.encode(sentences2, convert_to_tensor=True)

    # Compute cosine-similarities
    cosine_scores = util.cos_sim(embeddings1, embeddings2)
    return float(cosine_scores[0][0])
    # Output the pairs with their score
    # for i in range(len(sentences1)):
    #     print("{} \t\t {} \t\t Score: {:.4f}".format(
    #         sentences1[i], sentences2[i], cosine_scores[i][i]
    #     ))