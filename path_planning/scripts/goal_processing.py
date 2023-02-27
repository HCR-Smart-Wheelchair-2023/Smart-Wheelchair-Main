'''Keep Track of goal target'''

import rospy


# sub to the topic that subscribes to marker positions

Coordinate = tuple[float,float]


class GoalController:

    GOALS : dict[str,Coordinate] = {

    }

    def __init__(self) -> None:
        ...
        # create sub to the marker position
        # create sub to the goal label
        # create sub to the stop topic ?
        # create pub to the goal topic

        self.marker_sub = rospy.Subscriber(topic, ObjectStamped, self.receive_objects)
        self.goal_label_sub  = rospy.Subscriber(topic, ObjectStamped, self.receive_objects)
        self.pub = rospy.Publisher('/people', People, queue_size=10)

    def receive_marker(self, marker):
        ...

    def receive_goal_label_sub(self, goal_label):
        ...
