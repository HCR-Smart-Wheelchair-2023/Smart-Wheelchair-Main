#! /usr/bin/env python3

import rospy
from nav_msgs.msg import Odometry
from people_msg.msg import People, Person
from std_msgs.msg import Header


class ActorInformationConversion:
    def __init__(self) -> None:
        self.sub = rospy.Subscriber(
            '/odom_actor', Odometry, self.receive_objects)
        self.pub = rospy.Publisher('/people', People, queue_size=10)

    def receive_objects(self, message: Odometry):
        actor = Person()
        actor.header = Header()
        actor.odom = message
        actor.static.data = True
        actor.label.data = " "

        actors = People()
        actors.header = Header()
        actors.person = [actor]

        self.pub.publish(actors)


if __name__ == '__main__':
    rospy.init_node('actor_msg_maker')
    mp = ActorInformationConversion()
    rospy.spin()
