Python program which takes user email and store in
a text file.


Producer.py

It will keep checking the text file if any new user
sign up (email added) and send it to Kafka topic.


Consumer.py

It will keep checking any new data in kafka topic
and consume the messages.