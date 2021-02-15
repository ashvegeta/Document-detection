import utility
import predict

#get the path of the most recently added file
filepath= utility.mostrecentfile()
# print(filepath)


#apply the necessary preprocessing



#predict the model
category = predict.predict(filepath) #take path of the file as input and return the classification
print("document is: "+category)